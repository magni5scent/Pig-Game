"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const modal = document.querySelector(".modal");
const hint = document.querySelector(".hint");
const overlay = document.querySelector(".overlay");
const showModal = document.querySelector(".btn--show");
const closeModal = document.querySelector(".close-modal");
const showHint = document.querySelector(".btn--hint");
const closeHint = document.querySelector('.close-hint')
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;


function init() {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}

init()

function switchPlayer() {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

roll.addEventListener("click", () => {
   if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;
      
      if (dice !== 1) {
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent =
         currentScore;
      } else {
      switchPlayer();
   }
}
});

hold.addEventListener("click", () => {
   if (playing) {
      scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
        
        document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      } else {
         switchPlayer();
      }
   }
});



newGame.addEventListener("click", init)


//The How to play and hint function
const openModal = function () {
   modal.classList.remove("hidden");
   overlay.classList.remove("hidden");
};

const openHint = function () {
   hint.classList.remove('hidden');
   overlay.classList.remove('hidden')
}
showModal.addEventListener("click", openModal);

showHint.addEventListener("click", openHint);

function closeModals() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function closeHints() {
   hint.classList.add('hidden');
   overlay.classList.add('hidden');
}
closeModal.addEventListener("click", closeModals);
overlay.addEventListener("click", closeModals);

closeHint.addEventListener('click', closeHints);
overlay.addEventListener('click', closeHints)

