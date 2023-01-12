const arr = [];
let cardsQttDistribution = 0;
let board = document.querySelector('.board');

let cardUm = '';
let cardDois = '';

let moves = 0;

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

    imgBackFace.setAttribute('src', './assets/back.png')
    imgFrontFace.setAttribute('src', `./assets/FrontFace${numero}.gif`)

    front.appendChild(imgFrontFace)
    back.appendChild(imgBackFace)

    card.appendChild(front);
    card.appendChild(back);

    card.setAttribute("onclick", "flipCard(this)")
    card.setAttribute('data-cardId', numero)

    board.appendChild(card);
    return card

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
        //se for, começa o jogo
        for (let i = 0; i < cardsQttDistribution; i++) {
            //crie as cartas
            cardCreator(shuffledArry[i]);
        }
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
    alert (`Você ganhou em ${moves} jogadas!`)
    /*const response = prompt('Deseja continuar?');

    if(response==='sim'){
        location.reload();
    }else{
        return
    }*/
    
}

function endGame(moves){
    if(Number(cardsQttDistribution)===document.querySelectorAll('.flip').length){
        setTimeout(() => {
            restartGame()
        }, 500)

    }
}

