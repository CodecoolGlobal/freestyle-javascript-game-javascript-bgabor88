const easyCards = document.querySelectorAll('.memory-card-easy');
const normalCards = document.querySelectorAll('.memory-card-normal');
const hardCards = document.querySelectorAll('.memory-card-hard');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let secondCounter = 0;
let minuteCounter = 0;

if (easyCards.length !== 0) {
    cards = easyCards;
}
if (normalCards.length !== 0) {
    cards = normalCards;
}
if (hardCards.length !== 0) {
    cards = hardCards;
}

clock()

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    console.log('added')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
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
    document.getElementById('score').innerHTML = score;
    resetBoard();
}

function scoring() {
    if (minuteCounter === 0 && secondCounter <= 20){
        score += 10;
    } else if (minuteCounter === 0 && secondCounter > 20 && secondCounter <= 40){
        score += 8;
    } else {
        score += 5;
        console.log('5 points')
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
    document.getElementById('stopwatch').innerHTML = minuteCounter.toString() + ':' + secondCounter.toString();
    console.log(minuteCounter.toString() + ':' + secondCounter.toString());
}

cards.forEach(card => card.addEventListener('click', flipCard));