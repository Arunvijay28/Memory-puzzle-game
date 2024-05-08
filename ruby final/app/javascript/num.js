const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

var size=2;

let items = [];

for (let i = 2; i <= size*size; i += 2) {

    items.push({ name: `${i}`, loc: `1+${i - 1}` });
    items.push({ name: `${i}`, loc: `${i}` });

}

items.sort((a, b) => a.name.localeCompare(b.name)); // Sort the array by name

// inorder to make it dynamic by for increasing mode then icnlude more items and then increase size value from 4 to n

let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};


const generateRandom = (size) =>{
  size=(size*size) /2;
    for(let i=size;i>=0;i--){
      const randIndex = Math.floor(Math.random()*(i+1));
      [items[i],items[randIndex]] = [items[randIndex],items[i]]
  }

  cardValues=[...items];
  return cardValues;
}

const matrixGenerator = (cardValues, size) => {
  gameContainer.innerHTML = "";

  // cardValues = [...cardValues, ...cardValues];     // it duplicates the card array so it removed it instead it just shuffled it with random index with its size

  //simple shuffle

  cardValues.sort(() => Math.random() - 0.5);
  console.log(cardValues)
  for (let i = 0; i < size * size; i++) {

    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <p>${cardValues[i].loc}</p>
        
     </div>
     `;
  } 

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
 
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
     
      if (!card.classList.contains("matched")) {

        //flip the cliked card
        card.classList.add("flipped");
        if (!firstCard) {

          //so current card will become firstCard
          
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");

        } 
        else {
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            
            firstCard = false;

            winCount += 1;

            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();

            }
          } 
          else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  
  // Increase the size by 2
  size += 2;

  // Regenerate items list
  const newItems = [];
  for (let i = 2; i <= size * size; i += 2) {
    newItems.push({ name: `${i}`, loc: `1+${i - 1}` });
    newItems.push({ name: `${i}`, loc: `${i}` });
  }
  newItems.sort((a, b) => a.name.localeCompare(b.name)); // Sort the array by name
  items = newItems; // Update the items list
  
  let cardValues = generateRandom(size); // Generate random cards with updated size and items list
  console.log(cardValues);
  matrixGenerator(cardValues, size);
};

