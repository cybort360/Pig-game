'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const name0Element = document.getElementById('name--0');
const name1Element = document.getElementById('name--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const diceContentElement = document.querySelector('.dice-content');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const riskBtn = document.getElementById('risk-mode-btn');

const body = document.querySelector('body');
// document.querySelector('.center-box').appendChild(diceContentElement);

// Starting conditions
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; // state variable
let lastDice = [0, 0];
let isRiskMode = false;

name0Element.contentEditable = true;
name1Element.contentEditable = true;
let maxScore = prompt('Enter target score for the game');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variable
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// const switchPlayer = function () {
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   currentScore = 0;
//   if (activePlayer === 0) {
//     activePlayer = 1;
//   } else {
//     activePlayer = 0;
//   }
//   player0Element.classList.toggle('player--active');
//   player1Element.classList.toggle('player--active');
// };

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice-${dice}.png`;
    // diceContentElement.textContent = `You rolled: ${dice}`;
    // diceContentElement.classList.remove('hidden');

    // 3. Check for rolled 1: if true,
    if (dice === 6 && lastDice[activePlayer] === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
    } else if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //switch to next player
      //activePlayer = activePlayer === 0 ? 1 : 0;
      if (isRiskMode) {
        scores[activePlayer] = Math.max(0, scores[activePlayer] - 5);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
      }
      switchPlayer();
    }
    lastDice[activePlayer] = dice;
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    // example : scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= maxScore) {
      // Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();

      // you can create a function to not repeat yourself
    }
  }
});

riskBtn.addEventListener('click', function () {
  isRiskMode = !isRiskMode;
  this.classList.toggle('active');
  this.textContent = `💣 Risk Mode: ${isRiskMode ? 'ON' : 'OFF'}`;
  document.body.classList.toggle('risk-active', isRiskMode);
});

btnNew.addEventListener('click', function () {
  init();
  // diceContentElement.classList.add('hidden');
});
