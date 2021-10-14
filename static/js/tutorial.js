const cards = document.querySelectorAll('.memory-card-easy');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let secondCounter = 0;
let minuteCounter = 0;


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
    if (minuteCounter === 0 && secondCounter <= 20) {
        score += 10;
    } else if (minuteCounter === 0 && secondCounter > 20 && secondCounter <= 40) {
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


let watch = setInterval(function () {
    clock();
}, 1000);

function clock() {
    let time = new Date();
    secondCounter += 1;
    if (secondCounter === 60) {
        secondCounter -= 60;
        minuteCounter += 1;
    }
    document.getElementById('stopwatch').innerHTML = minuteCounter.toString() + ':' + secondCounter.toString();
    console.log(minuteCounter.toString() + ':' + secondCounter.toString());
}

cards.forEach(card => card.addEventListener('click', flipCard));

// Tutorial content

let firstClickFinished = false
let secondClickFinished = false

function firstClick() {
    firstClickFinished = true
    Swal.fire({
        title: 'Good job!',
        text: 'Now click on the one BELOW it.',
        confirmButtonText: 'Got it!'
    })
    setInterval(function(){
        if (secondClickFinished == false) {
            if (cards[5].style.visibility === 'hidden') {
                cards[5].style.visibility = 'visible';
            } else {
                cards[5].style.visibility = 'hidden';
            }
        }
    }, 1000);
    cards[5].addEventListener('click', secondClick);
}

function secondClick() {
    secondClickFinished = true
    Swal.fire({
        title: 'Bad luck!',
        text: 'These were not a pair. Click on the first one again!',
        confirmButtonText: 'Sure!'
    })
}

window.onload = (event) => {
    document.body.style.background = 'url(/static/assets/tutorial.jpg), no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover'
    Swal.fire({
        title: 'Welcome to the tutorial!',
        text: 'In this tutorial, you will learn the basics of Game of Pairs.',
        confirmButtonText: 'I am your Padawan!'
    })
        .then((result) => {
            Swal.fire({
                title: 'Flipping a card',
                text: 'Click on the first card to reveal it´s content.',
                confirmButtonText: 'Yes, Master Yoda!'
            })
            setInterval(function(){
                if (firstClickFinished == false) {
                    if (cards[0].style.visibility === 'hidden') {
                        cards[0].style.visibility = 'visible';
                    } else {
                        cards[0].style.visibility = 'hidden';
                    }
                }
            }, 1000);
    })
    cards[0].addEventListener('click', firstClick);

    /*new Promise((resolve, reject) => {
        document.body.style.background = 'url(/static/assets/tutorial.jpg), no-repeat center center fixed';
        document.body.style.backgroundSize = 'cover'
        resolve()
    })
        .then(() => {
            let modalsIntro = [];
            modalsIntro.push({
                title: 'Welcome to the tutorial!',
                text: 'In this tutorial, you will learn the basics of Game of Pairs.'
            });
            modalsIntro.push({title: 'Flipping a card', text: 'Click on the first card to reveal it´s content.'});
            Swal.queue(modalsIntro);
        });

     */
};


