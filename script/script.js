//criar as cartas
let cardsQttDistribution = 0;
let board = document.querySelector('.board');


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

const cardCreator = () => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'front-face face');
    const back = createElement('div', 'back-face face');

    front.innerHTML = "frente"
    back.innerHTML = "verso"

    card.appendChild(front);
    card.appendChild(back);

    card.setAttribute("onclick", "selectCard(this)")

    board.appendChild(card);
    return card

}

function boardPreparation() {
    //quantidade de cartas que o usuário quer
    cardsQttDistribution = prompt("COM QUANTAS CARTAS DESEJA JOGAR? ESCOLHA ENTRE: 4, 6, 8, 10, 12 OU 14!");

    //verificar se o número digitado é [4,14]%2===0
    if (cardsQttDistribution >= 4 && cardsQttDistribution <= 14 && cardsQttDistribution % 2 === 0) {
        //se for, começa o jogo
        for(let i = 0; i< cardsQttDistribution;i++){
            //crie as cartas
            cardCreator(cardsQttDistribution);
        }
        return;
    } else {
        //se não for, pergunte novamente
        boardPreparation();
    }
}
boardPreparation();
