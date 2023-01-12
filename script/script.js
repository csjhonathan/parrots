const arr = [];
let cardsQttDistribution = 0;
let board = document.querySelector('.board');

let cardUm = '';
let cardDois = '';

let moves = 0;

let cron = document.querySelector('.timer');
let seconds = 0;

//criar as cartas
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

const cardCreator = (numero) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'front face');
    const back = createElement('div', 'back face');
    const imgBackFace = createElement('img', 'backFaceImg');
    const imgFrontFace = createElement('img', 'frontFaceImg')

    //inserindo as imagens
    imgBackFace.setAttribute('src', './assets/back.png');
    imgFrontFace.setAttribute('src', `./assets/FrontFace${numero}.gif`);

    //inserindo os data-tests
    imgBackFace.setAttribute('data-test', 'face-down-image');
    imgFrontFace.setAttribute('data-test', `face-up-image`);

    front.appendChild(imgFrontFace);
    back.appendChild(imgBackFace);

    card.appendChild(front);
    card.appendChild(back);

    card.setAttribute("onclick", "flipCard(this)");
    card.setAttribute('data-cardId', numero);
    card.setAttribute('data-test', 'card');
    
    board.appendChild(card);
    return card

}

function startCron(){
    console.log("estou aqui")
    this.cronometer = setInterval(()=> {
        const currentTime = +cron.innerHTML;
        cron.innerHTML =  currentTime + 1;
    }, 1000)
}
function boardPreparation() {
    
    //quantidade de cartas que o usuário quer
    cardsQttDistribution = prompt("COM QUANTAS CARTAS DESEJA JOGAR? ESCOLHA ENTRE: 4, 6, 8, 10, 12 OU 14!");
    for(let i = 0; i < (cardsQttDistribution/2); i++){
        arr.push(i)
    }

    const shuffledArry = ([...arr, ...arr]).sort(()=> Math.random () - 0.5)
    //verificar se o número digitado é [4,14]%2===0
    if (cardsQttDistribution >= 4 && cardsQttDistribution <= 14 && cardsQttDistribution % 2 === 0) {
        //se for, começa o jogo e o timer
        for (let i = 0; i < cardsQttDistribution; i++) {
            //crie as cartas
            cardCreator(shuffledArry[i]);
        }
        startCron()
        return;
    } else {
        //se não for, pergunte novamente
        boardPreparation();
    }

    
}
boardPreparation();

function verifyCards (){
    const cardOne = cardUm.getAttribute('data-cardId');
    const cardTwo = cardDois.getAttribute('data-cardId');
    
    if (cardOne === cardTwo){
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
    
    if(cards.classList.contains('flip')){
        return
    }

    if(cardUm === ''){
        moves += 1;
        cards.classList.add('flip');
        cardUm = cards;
    } else if (cardDois === ''){
        moves += 1;
        cards.classList.add('flip');
        cardDois = cards;
        verifyCards(cards)
        endGame()
    }
}

function restartGame() {
    clearInterval(this.cronometer)
    alert (`Você ganhou em ${moves} jogadas! A duração do jogo foi de ${cron.innerHTML} segundos!`);
    const response = prompt('Deseja continuar?');

    if(response==='sim'){
        location.reload();
    }else{
        return
    }
    
}

function endGame(moves){
    if(Number(cardsQttDistribution)===document.querySelectorAll('.flip').length){
        setTimeout(() => {
            restartGame()
        }, 500)

    }
}

