'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let player0Score, player1Score, currentScore, activePlayer, playing;
const init = () => {
  player0Score = 0;
  player1Score = 0;
  currentScore = 0;
  activePlayer = 0; 
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner'); 
  player1El.classList.remove('player--winner');
};

const switchPlayer = () => {
  if (activePlayer === 0) {
    current0El.textContent = '0';
  } else {
    current1El.textContent = '0';
  }
  currentScore = 0; 
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


btnRoll.addEventListener('click', () => {
  if (playing) {
    
    const dice = Math.trunc(Math.random() * 6) + 1;
 diceEl.src = `dice-${dice}.jpg`;
    diceEl.classList.remove('hidden');
if (dice !== 1) {
     currentScore += dice;
      if (activePlayer === 0) {
        current0El.textContent = currentScore;
      } else {
        current1El.textContent = currentScore;
      }
    } else {
     switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
   if (activePlayer === 0) {
      player0Score += currentScore;
      score0El.textContent = player0Score;
    } else {
      player1Score += currentScore;
      score1El.textContent = player1Score;
    }
 if (player0Score >= 100 || player1Score >= 100) {
      playing = false; // End the game
      diceEl.classList.add('hidden');
 if (activePlayer === 0) {
        player0El.classList.add('player--winner');
      } else {
        player1El.classList.add('player--winner');
      }
      alert(`🎉 Player ${activePlayer + 1} wins!`); 
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);

init();
