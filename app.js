const cards = document.querySelectorAll(".card");
const reset = document.querySelector(".reset-game");
let numberOfCardsArray = [];
for (var i = 1; i < cards.length; i++) {
  numberOfCardsArray.push(i);
}

let ranNums = shuffle(numberOfCardsArray);
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) {
    return;
  }

  if (this === firstCard) {
    return;
  }
  this.classList.toggle("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unFlipCards();
  }
}

function resetBoard() {
  hasFlippedCard = lockBoard = false;
  firstCard = secondCard = null;
}

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

cards.forEach((card, index) => {
  card.style.order = ranNums[index];
});

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});
