'use strict';

// Select Game Elements
const modal = document.querySelector('.modal');
const main = document.querySelector('.main');
const player0 = document.querySelector('.player0');
const player1 = document.querySelector('.player1');
const score0 = document.querySelector('#score0');
const score1 = document.querySelector('#score1');
const current0 = document.querySelector('.current0');
const current1 = document.querySelector('.current1');
const die = document.querySelector('.die');
const btnReset = document.querySelector('.btn-reset');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnShowModal = document.querySelector('.btn-show-modal');

// Close Modal
btnCloseModal.addEventListener('click', () => {
	modal.classList.add('close-modal');
	main.classList.remove('blur');
});

// Show Modal
btnShowModal.addEventListener('click', () => {
	modal.classList.remove('close-modal');
	main.classList.add('blur');
});

// Set Variables
let scores, currentScore, activePlayer, playing;

// Initialise the game
const initGame = () => {
	// Init Values
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	// Update text content
	score0.textContent = 0;
	score1.textContent = 0;
	current0.textContent = 0;
	current1.textContent = 0;

	// Update classes
	die.classList.add('hidden');
	player0.classList.add('player-active');
	player1.classList.remove('player-active', 'winner');
	player0.classList.remove('winner');
};

initGame();

// Change Player
const changePlayer = () => {
	// Set current score of active player to zero
	document.querySelector(`.current${activePlayer}`).textContent = 0;
	currentScore = 0;

	// Swap Active Player
	activePlayer = activePlayer === 0 ? 1 : 0;

	// Toggle Active Class
	player0.classList.toggle('player-active');
	player1.classList.toggle('player-active');
};

// Roll Dice
btnRoll.addEventListener('click', () => {
	// Check we are playing game
	if (playing) {
		const dice = Math.floor(Math.random() * 6) + 1;
		die.classList.remove('hidden');
		die.src = `images/dice-${dice}.png`;

		if (dice !== 1) {
			currentScore += dice;
			document.querySelector(`.current${activePlayer}`).textContent =
				currentScore;
		} else {
			changePlayer();
		}
	}
});

// Hold Current Score
btnHold.addEventListener('click', () => {
	if (playing) {
		scores[activePlayer] += currentScore;
		document.querySelector(`#score${activePlayer}`).textContent =
			scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			playing = false;
			player0.classList.remove('activePlayer');
			player1.classList.remove('activePlayer');
			document.querySelector(`.player${activePlayer}`).classList.add('winner');
			die.classList.add('hidden');
		} else {
			changePlayer();
		}
	}
});

// Reset the Game
btnReset.addEventListener('click', initGame);
