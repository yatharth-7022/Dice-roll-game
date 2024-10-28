"use strict";
let buttonRoll = document.querySelector(".btn--roll");
let holdButton = document.querySelector(".btn--hold");
let newButton = document.querySelector(".btn--new");
let firstPlayerScore = document.getElementById("score--0");
let secondPlayerScore = document.getElementById("score--1");
let currentFirstPlayerScore = document.getElementById("current--0");
let currentSecondPlayerScore = document.getElementById("current--1");
let currentScore, activePlayer, score, playing;
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  firstPlayerScore.textContent = score[0];
  secondPlayerScore.textContent = score[1];
  currentFirstPlayerScore.textContent = 0;
  currentSecondPlayerScore.textContent = 0;
};
init();
const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};

let dice = document.querySelector(".dice");
dice.classList.add("hidden");
firstPlayerScore.textContent = 0;
secondPlayerScore.textContent = 0;

buttonRoll.addEventListener("click", () => {
  if (playing) {
    let diceRolledNumber = Math.floor(Math.random() * 6 + 1);
    console.log(diceRolledNumber);

    dice.classList.remove("hidden");
    dice.src = `dice-${diceRolledNumber}.png`;
    if (diceRolledNumber !== 1) {
      //dice is not 1 so add current score
      currentScore += diceRolledNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayers();
    }
  }
});
holdButton.addEventListener("click", () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchingPlayers();
    }
  }
});
newButton.addEventListener("click", init);
