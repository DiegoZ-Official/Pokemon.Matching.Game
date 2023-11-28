// Function to create a new card element with predefined structure
function createNewCard() {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;
  return cardElement;
} 

// Function to append a new card to a specified parent element
function appendNewCard(parentElement) {
  const cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}

// Function to shuffle an array of card image classes
function shuffleCardImageClasses() {
  const cardClasses = [
    'image-1', 'image-2', 'image-3', 'image-4', 'image-5', 'image-6',
    'image-1', 'image-2', 'image-3', 'image-4', 'image-5', 'image-6'
  ];
  const shuffledClasses = _.shuffle(cardClasses);
  return shuffledClasses;
}

// Function to create and initialize a set of cards with shuffled image classes
function createCards(parentElement, shuffledImageClasses) {
  const cardObjects = [];
  for (let i = 0; i < 12; i++) {
    const cardElement = appendNewCard(parentElement);
    cardElement.classList.add(shuffledImageClasses[i]);
    const cardObject = {
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i]
    };
    cardObjects.push(cardObject);
  }
  return cardObjects;
}

// Function to check if two card objects have matching image classes
function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}
// doCardsMatchTest();

// Object to store counters for flips and matches
let counters = {};

// Function to increment a specified counter and update the corresponding element's text
function incrementCounter(counterName, parentElement) {
  counters[counterName] = counters[counterName] || 0;
  counters[counterName]++;
  parentElement.innerText = counters[counterName];
}

// Variable to store the last flipped card during the game
let lastCardFlipped = null;

// Function called when a card is flipped; handles matching logic
function onCardFlipped(newlyFlippedCard) {
  incrementCounter('flips', document.getElementById('flip-count'));
  if (!lastCardFlipped) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    newlyFlippedCard.element.classList.remove('flipped');
    lastCardFlipped.element.classList.remove('flipped');
    lastCardFlipped = null;
    return;
  }
  incrementCounter('matches', document.getElementById('match-count'));
  newlyFlippedCard.element.classList.add('border-glow');
  lastCardFlipped.element.classList.add('border-glow');
  const matchesNeededToWin = 6;
  if (counters.matches === matchesNeededToWin) {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  lastCardFlipped = null;
}

// Function to reset the game, clearing the card container and resetting counters
function resetGame() {
  const cardContainer = document.getElementById('card-container');
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  document.getElementById('flip-count').innerText = '0';
  document.getElementById('match-count').innerText = '0';
  counters = {};
  lastCardFlipped = null;
  setUpGame();
}

// Initial setup of the game
setUpGame();
