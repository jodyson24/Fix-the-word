/*
/*
Problem: The game has no interactivity.

//Steps to solve the problem:

//	1.	Create an array containing a list of words (in correct order)
	//	1.1	Create a function that takes in a word and returns a scrambled form of the word
//	2.	Show a scrambled word to the player
	//	2.1	Get user input
	//	2.2	Check if user input is correct form of scrambled word
		// 2.2.1 If correct, add one to user score
				//	else do nothing, user gets no additional score
/////////////////////////////////////////////////////////////////////////////


(function () {
	var correctWords = ['word', 'hello', 'fight', 'length', 'homosapien', 'complex', 'delicious', 'officer', 'help', 'enter'],
		jumbled = document.querySelector('.jumbled-word'),
		userAnswer = document.querySelector('input[name="user-answer"]'),
		userAnswerValue = userAnswer.value,
		score = 0;

function jumbleWord(word) {
	'use strict';
	return word.split('').sort(function () {
		return Math.floor(Math.random() * word.length);
	}).join('');
}

function displayJumbledWord() {
	'use strict';
	jumbled.innerHTML = jumbleWord(correctWords[0]);
}

function nextWord() {
	var btn = document.querySelector('.next'),
		counter = 1;

	btn.addEventListener('click', function () {

		jumbled.innerHTML = correctWords[counter++];
	}, false)
}

function clearField() {
	var btn = document.querySelector('.clear');

	btn.addEventListener('click', function () {
		userAnswer.value = '';
	}, false)
}

displayJumbledWord();
nextWord();
clearField();

}());*/

(function () {
	'use strict';
	var correctWords = ['eloquent', 'extreme', 'enlightenment', 'retroactive', 'homosapien', 'complex', 'direction', 'officer', 'multidimensional', 'over-protective'],
		jumbled = document.querySelector('.jumbled-word'),
		userInput = document.querySelector('input[name="user-answer"]'),
		nextBtn = document.querySelector('.next'),
		clrInput = document.querySelector('.clear'),
		game = {
			start: function () {
				game.view.displayJumbledWord();
			},

			model: {
				currentScore: 0
			},

			view: {
				jumbleWord: function (word) {
					return word.split('').sort(function () {
						return Math.floor(Math.random() * word.length);
					}).join('');
				},

				displayJumbledWord: function () {
					jumbled.innerHTML = game.view.jumbleWord(correctWords[0]);
					game.controller.checkUserInput();
					game.controller.clearUserInput();
				}

			},

			controller: {
				checkUserInput: function () {
					userInput.addEventListener('keyup', function () {
						if (userInput.value.length > 0) {
							nextBtn.removeAttribute('disabled');
							game.controller.handleUserInput();
						} else {
							nextBtn.setAttribute('disabled', true);
						}
					}, false);
				},
				handleUserInput: function () {
					var userInputValue = userInput.value,
						counter = 1;
					nextBtn.addEventListener('click', function () {
						var current = jumbled.innerHTML = correctWords[counter += 1];

						correctWords.forEach(function (item, index, array) {
							if (userInputValue.toLowerCase() === current) {
								game.model.currentScore += 1;
								console.log('correct');
							} else {
								console.log('wrong');
							}
						});
					}, false);
					//console.log(game.model.currentScore);
				},
				clearUserInput: function () {
					clrInput.addEventListener('click', function () {
						userInput.value = '';
						nextBtn.setAttribute('disabled', true);
					}, false);
				}
			}
		};
	game.start();
}());
