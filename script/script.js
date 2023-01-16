const arr = [0, 1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5); // <-- primeira randomizção
//armazeno a quantidade de cartas que o usuário digitou;
let cardsQttDistribution = 0;
//armazeno aqui o "tabuleiro";
let board = document.querySelector('.board');

//armazeno a primeira carta clicada;
let cardUm = '';
//armazeno a segunda carta clicada;
let cardDois = '';

//contador de movimentos;
let moves = 0;

//pegando o cronometro no html;
let cron = document.querySelector('.timer');

// aqui nós montamos os elementos que compõem as cartas
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

//aqui nós montamos ar cartas
const cardCreator = (cardId) => {

    //criando os elementos
    const card = createElement('div', 'card');//<-- a carta em si
    const front = createElement('div', 'front face');//<-- div que recebe a face com o gif
    const back = createElement('div', 'back face');//<-- div que recebe a face com o parrot estático
    const imgBackFace = createElement('img', 'backFaceImg');//<-- tag img do parrot estático em si
    const imgFrontFace = createElement('img', 'frontFaceImg')//<-- tag img do parrot gif em si

    //inserindo as imagens
    imgBackFace.setAttribute('src', './assets/back.png'); //<-- adicionando os atributos da tag img
    imgFrontFace.setAttribute('src', `./assets/FrontFace${cardId}.gif`);//<-- adicionando os atributos da tag img

    //inserindo os data-tests
    imgBackFace.setAttribute('data-test', 'face-down-image');//<-- adicionando os atributos data-test para a avaliação do projeto
    imgFrontFace.setAttribute('data-test', `face-up-image`);//<-- adicionando os atributos data-test para a avaliação do projeto
    card.setAttribute('data-test', 'card');//<-- adicionando os atributos data-test para a avaliação do projeto

    //inserindo as imgs dentro das divs
    front.appendChild(imgFrontFace);//<-- adicionando as tags img dentro das divs
    back.appendChild(imgBackFace);//<-- adicionando as tags img dentro das divs

    //inserindo as faces das cartas
    card.appendChild(front);//<-- adicionando as divs dentro da div.card
    card.appendChild(back);//<-- adicionando as divs dentro da div.card

    card.setAttribute("onclick", "flipCard(this)");//<-- colocando atributo onclick na div.card
    card.setAttribute('data-cardId', cardId);//<-- colocando atributo data-cardID para verificação posterior e o ID passado pelo criador de IDs

    //insere a carta no board
    board.appendChild(card);//<--inserindo no Board a carte, finalmente, criada
    return card

}

//randomizador da ordem das cartas
const cardsRandomizer = function (cardsQtt) {
    //cardsQtt é um valor recebido pela F() boardPreparation, que recebeu de gamePreparation
    let randomArr = []; // <-- array vazio que recebe o ID das cartas na ordem que foi recebida no arr;
    for (let i = 0; i < (cardsQtt / 2); i++) {
        randomArr.push(arr[i]) //<-- envia para o randomArr os IDs na metade da quantidade que o user pedir
    }

    const shuffledArray = ([...randomArr, ...randomArr]).sort(() => Math.random() - 0.5);//<-- segunda randomização, recebe o randomArr 2x e ramdomiza de novo
    return shuffledArray //<--retorna os ids embaralhados
}

function startCron() {

    this.cronometer = setInterval(() => {
        const currentTime = +cron.innerHTML;
        cron.innerHTML = currentTime + 1;
    }, 1000)

}
const sendCardsId = function (cardsQttShuffled) { //<-- recebe os ids já embaralhados 2x numa array que tem o tamanho de cartas que o user pediu
    for (let i = 0; i < cardsQttShuffled.length; i++) {//<-- percorre a array e vai enviando os IDs para a F() criadora de cartas
        cardCreator(shuffledArray[i]); //<-- recebe um ID e envia para o criador de cartas
    }
}

//quantidade de cartas que o usuário quer
function gamePreparation() {
    cardsQttDistribution = prompt("COM QUANTAS CARTAS DESEJA JOGAR? ESCOLHA ENTRE: 4, 6, 8, 10, 12 OU 14!"); //<-- perguntando com quantas cartas o user quer jogar
    boardPreparation(cardsQttDistribution); //<--enviando a informação para a boardPreparation() para a preparação do jogo
}

gamePreparation()


function boardPreparation(cardsQtt) {//<--recebe a informação do gamePreparation sobre a quantidade de cartas

    //verificar se o número digitado é [4,14]%2===0
    if (cardsQtt >= 4 && cardsQtt <= 14 && cardsQtt % 2 === 0) {
        //se for, passe para o criador de IDs e inicie o cronometro
        shuffledArray = cardsRandomizer(cardsQtt);//<-- o criador de IDs recebeu a quantidade de cartas, e criou e devolveu os IDs já embaralhados numa array;
        sendCardsId(shuffledArray)//<-- uma vez que tenha recebido os ids, enviamos para a função que vai distribuir para o criador de cartas
        startCron()//<-- inicia o cronômetro
        return;
    } else {
        //se não for, pergunte novamente
        gamePreparation();
    }
}


function verifyCards() {
    const cardOne = cardUm.getAttribute('data-cardId');
    const cardTwo = cardDois.getAttribute('data-cardId');

    if (cardOne === cardTwo) {
        cardUm = '';
        cardDois = '';
    } else {
        setTimeout(() => {
            cardUm.classList.remove('flip')
            cardDois.classList.remove('flip')

            cardUm = '';
            cardDois = '';

        }, 1200);
    }
}

function flipCard(cards) {

    if (cards.classList.contains('flip')) {
        return
    }

    if (cardUm === '') {
        moves += 1;
        cards.classList.add('flip');
        cardUm = cards;
    } else if (cardDois === '') {
        moves += 1;
        cards.classList.add('flip');
        cardDois = cards;
        verifyCards(cards)
        endGame(moves)
    }
}

function restartGame() {
    let response = prompt('Deseja continuar? DIGITE: "sim" ou "não"');

    if (response !== 'sim' && response !== 'não') {
        restartGame()
    } else if (response === 'sim') {
        location.reload();
    } else {
        return
    }
}

function endGame(moves) {
    if (Number(cardsQttDistribution) === document.querySelectorAll('.flip').length) {
        clearInterval(this.cronometer);
        setTimeout(() => {
            alert(`Você ganhou em ${moves} jogadas! A duração do jogo foi de ${cron.innerHTML} segundos!`);
            restartGame()
        }, 500)

    }
}

