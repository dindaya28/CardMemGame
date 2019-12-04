const cards = document.querySelectorAll('.mem-card');
const button = document.querySelector('.reset');

let firstFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let finishCounter = 0, moveCounter = 0, highscore = 0;
let finish = 6;

function flipCard() {

    // locks the board until non-matching cards flip back over
    if (lockBoard) return;

    updateMoves();

    // check ensures that the same card cannot be clicked twice
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstFlippedCard) {
        // first card has been clicked
        firstFlippedCard = true;
        firstCard = this;
    } else {
        // second card has been clicked
        secondCard = this;

        checkMatch();
    }
}

function checkMatch() {
    // Check if the two cards match
    // Make use of HTML data attribute, assigning one to each mem-card
    
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards(); // ternary evaluator
    
    // the equivalent of the above is seen below in comments

    /* 
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        // it's a match
        disableCards();
    } else {
        // cards do not match
        unflipCards();
    } */
}

// function disables cards that have already been found to be matching
function disableCards() {

    lockBoard = true;

    setTimeout( () => {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        // works at removing the cards, but causes the container to rearrange...
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');

        checkVictory();

    }, 1500);

}

function unflipCards() {
    // lock the board until cards have been flipped back over
    lockBoard = true;

    // set time out so that we can see the cards that were flipped, instead of the flip addition being removed instantly
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// function resets the board if there are no matches found or if the same card has been clicked twice
function resetBoard() {
    [firstFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// function to update move counter
function updateMoves() {
    // keep track of number of moves taken)
    moveCounter++;
    document.getElementById("moves").innerHTML = moveCounter;

    if (moveCounter > highscore) {
        document.getElementById('highscore').innerHTML = moveCounter;
    }
}

// function checks to see if the user has found all 6 pairs
function checkVictory() {
    finishCounter++;

    let victory = (finishCounter === finish);

    victory ? gameOver() : resetBoard();
}

function newGame() {
    console.log("button works!")

    // reset move counter
    moveCounter = 0;
    document.getElementById("moves").innerHTML = moveCounter;


}

function gameOver() {

}

// function assigns a random order to the cards at the start of the game to simulate shuffling
(function shuffle() {
    cards.forEach(card => {
        let randPos = Math.floor(Math.random() * 12);
        card.style.order = randPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));
button.addEventListener('click', newGame);