const easyCards = document.querySelectorAll('.memory-card-easy');
const normalCards = document.querySelectorAll('.memory-card-normal');
const hardCards = document.querySelectorAll('.memory-card-hard');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let secondCounter = 0;
let minuteCounter = 0;
let isWin = false;
let foundedCards = [];
let button = document.getElementById('button');

button.addEventListener('click', () => {
    let input = document.getElementById('final-score');
    input.setAttribute('value', score);
})

if (easyCards.length !== 0) {
    cards = easyCards;
}
if (normalCards.length !== 0) {
    cards = normalCards;
}
if (hardCards.length !== 0) {
    cards = hardCards;
}

clock();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    scoring();
    foundedCards.push(firstCard.alt);
    document.getElementById('score').innerHTML = score;
    hasWon();
    resetBoard();
}

function scoring() {
    if (minuteCounter === 0 && secondCounter <= 30){
        score += 10;
    } else if (minuteCounter === 0 && secondCounter > 30 && secondCounter <= 60){
        score += 8;
    } else {
        score += 5;
    }
}

function hasWon() {
    if (easyCards.length !== 0 && foundedCards.length === 10){
        endGame();
    }
    if (normalCards.length !== 0 && foundedCards.length === 14){
        endGame();
    }
    if (hardCards.length !== 0 && foundedCards.length === 20){
        endGame();
    }
}

function endGame() {
    isWin = true;
    let playTime = document.getElementById('stopwatch').innerHTML;
    Swal.fire('Congrats!!!\nYour score is:' + score.toString() + '\nYour time is: ' + playTime);
    document.getElementById('button').classList.remove('menu-button-hide');
    document.getElementById('button').classList.add('menu-button');
    try {
        document.getElementById('win-message').classList.remove('win-message-hide');
        document.getElementById('win-message').classList.add('win-message');
    }
    catch (error){
        document.getElementById('new-level-message').classList.remove('new-level-message-hide');
        document.getElementById('new-level-message').classList.add('new-level-message');
    }
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos.toString();
    });
})();

let watch = setInterval(function() {
  clock();
}, 1000);

function clock() {
    let time = new Date();
    secondCounter += 1;
    if (secondCounter === 60){
        secondCounter -= 60;
        minuteCounter += 1;
    }
    if (isWin !== true) {
        document.getElementById('stopwatch').innerHTML = minuteCounter.toString() + ':' + secondCounter.toString();
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));