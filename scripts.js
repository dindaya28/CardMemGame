const cards = document.querySelectorAll('.mem-card');

let firstFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!firstFlippedCard) {
        // first card has been clicked
        firstFlippedCard = true;
        firstCard = this;
    } else {
        // second card has been clicked
        firstFlippedCard = false;
        secondCard = this;

        // Check if the two cards match
        // Make use of HTML data attribute, assigning one to each mem-card
        if(firstCard.dataset.framework === secondCard.dataset.framework) {
            // it's a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // cards do not match
            // set time out so that we can see the cards that were flipped, instead of the flip addition being removed instantly
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

