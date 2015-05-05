(function () {
	'use strict';

	var doc = function (elem) {
		return document.querySelector(elem);
	};

	doc('.game').style.display = 'none'; // hide game section on page load

	function scrambleWordGame() {
		var correctWords = [],
			wordList,
			wordListWrapper = doc('.word-list'),
			total,
			scrambledArr = [],
			jumbledWord = doc('.jumbled-word'),
			inputBox = doc('input[name="user-answer"]'),
			$successAlert = $('.alert-success'), //Returns a jQuery Object. I'm using jQuery for it's built in animations.
			$warningAlert = $('.alert-danger'), //Returns a jQuery Object. I'm using jQuery for it's built in animations.
			$successMsg = $('.success-msg'), //Returns a jQuery Object. I'm using jQuery for it's built in animations.
			$errorMsg = $('.warning-msg'), //Returns a jQuery Object. I'm using jQuery for it's built in animations.
			nextBtn = doc('.next'),
			clrBtn = doc('.clear'),
			hintBtn = doc('.hint'),
			firstLetter = doc('.first-letter'),
			lastLetter = doc('.last-letter'),
			counter = 0,
			score = 0,
			fiveMins = 60 * 5, // 60 seconds multiply 5
			timer = doc('.timer'),
			callTimer,
			html;

		function copyArr(arr) {
			var newArr = [],
				i,
				len;

			for (i = 0, len = arr.length; i < len; i += 1) {
				newArr[i] = arr[i];
			}

			return newArr;
		}

		function generateUniqueNumber(startRange, endRange) {
			var rand = Math.floor(Math.random() * (endRange + 1));

			if (rand < startRange) {
				rand = startRange;
			}

			return rand;
		}

		function scrambleArr(arr) {
			var newVal = arr,
				len = arr.length,
				i,
				j,
				tmp;

			for (i = len - 1; i > 0; i -= 1) {
				j = Math.floor(Math.random() * (i + 1));
				tmp = newVal[i];
				newVal[i] = newVal[j];
				newVal[j] = tmp;
			}
			return newVal;
		}

		function pushWord() {
			correctWords.length = 10;

			scrambleArr(wordWrapper.wordArr);

			correctWords[0] = wordWrapper.wordArr[generateUniqueNumber(0, 6143)];
			correctWords[1] = wordWrapper.wordArr[generateUniqueNumber(6144, 8109)];
			correctWords[2] = wordWrapper.wordArr[generateUniqueNumber(8110, 8449)];
			correctWords[3] = wordWrapper.wordArr[generateUniqueNumber(8450, 8665)];
			correctWords[4] = wordWrapper.wordArr[generateUniqueNumber(8666, 8761)];
			correctWords[5] = wordWrapper.wordArr[generateUniqueNumber(8762, 8930)];
			correctWords[6] = wordWrapper.wordArr[generateUniqueNumber(8931, 9100)];
			correctWords[7] = wordWrapper.wordArr[generateUniqueNumber(9101, 9290)];
			correctWords[8] = wordWrapper.wordArr[generateUniqueNumber(9291, 9396)];
			correctWords[9] = wordWrapper.wordArr[generateUniqueNumber(9397, 9492)];


			wordList = copyArr(correctWords);
			total = wordList.length;
		}


		function scrambleWord(word) {
		/*return word.split('').sort(function () {
			return Math.floor(Math.random() * word.length);
		}).join('');*/
			var newVal = word.split(''),
				len = word.length,
				i,
				j,
				tmp;

			for (i = len - 1; i > 0; i -= 1) {
				j = Math.floor(Math.random() * (i + 1));
				tmp = newVal[i];
				newVal[i] = newVal[j];
				newVal[j] = tmp;
			}
			return newVal.join('');
		}

		function generateScrambledArray(arr) {
			var i,
				len;
			for (i = 0, len = correctWords.length; i < len; i += 1) {
				scrambledArr.push(scrambleWord(correctWords[i]));
			}
		}

		function displayWord() {
			$('.hint-msg').hide();
			jumbledWord.textContent = scrambledArr[counter];
		}

		inputBox.addEventListener('keyup', function () {
			if (this.value.length > 0) {
				nextBtn.removeAttribute('disabled');
			} else {
				nextBtn.setAttribute('disabled', true);
			}
		}, false);

		clrBtn.addEventListener('click', function () {
			if (inputBox.value.length > 0) {
				inputBox.value = '';
				nextBtn.setAttribute('disabled', true);
			} else if (inputBox.value.length === 0) {
				nextBtn.setAttribute('disabled', true);
			} else {
				nextBtn.removeAttribute('disabled');
			}
		}, false);

		function gameOver() {
			clearInterval(callTimer);
			timer.textContent = '00:00';
			var resultTitle = doc('.result_title'),
				message = doc('.additional_notes'),
				i,
				len;
			jumbledWord.textContent = '';

			if (score === 0) {
				resultTitle.textContent = 'Too poor, King \'scatter\' \'scatter\' destroyed all the words';
				message.textContent = 'You got a score of ' + score + ' out of ' + total;
			} else if (score <= 5) {
				resultTitle.textContent = 'Poor, King \'scatter\' \'scatter\' got away with most words';
				message.textContent = 'You got a score of ' + score + ' out of ' + total;
			} else if (score <= 7) {
				resultTitle.textContent = 'Average Performance, you can do better';
				message.textContent = 'You got a score of ' + score + ' out of ' + total;
			} else if (score <= 9) {
				resultTitle.textContent = 'Good, Almost There..';
				message.textContent = 'You got a score of ' + score + ' out of ' + total;
			} else {
				resultTitle.textContent = 'Excellente, all the words are safe.';
				message.textContent = 'You got a perfect score of ' + score;
			}

			function showWords(arr, elem) {
				var words = [];

				for (var i = 0, len = arr.length; i < len; i += 1) {
					words.push('<p>' + (i + 1) + '. <a href="http://en.wikitionary.org/wiki/' + arr[i] + '">' + arr[i] + '</a></p>');
				}

				for (var j = 0, wordsLength = words.length; j < wordsLength; j += 1) {
					elem.insertAdjacentHTML('beforeend', words[j]);
				}

				console.log(elem.children.length);
			}

			showWords(wordList, wordListWrapper);

			doc('.replay').addEventListener('click', restartGame, false);

			$('#resultModal').modal();
		}

		function checkUserInput(elem) {
			if (inputBox.value.toLowerCase() === elem[0]) {
				score += 1;
				$successAlert.fadeIn('slow');
				$successMsg.text('Correctimundo');
				$successAlert.fadeOut(500);
			} else {
				$warningAlert.fadeIn('slow');
				$errorMsg.text('Nope!! Wrong');
				$warningAlert.fadeOut(500);
			}
			elem.shift();
			if (elem.length === 0) {
				$warningAlert.hide();
				gameOver();
			}
		}

		function gameEvents() {
			nextBtn.addEventListener('click', function () {
				$('.hint-msg').slideUp('fast');
				hintBtn.style.display = 'block';
				checkUserInput(correctWords);
				jumbledWord.textContent = scrambledArr[counter += 1];
			}, false);
		}

		hintBtn.addEventListener('click', function () {
			$(this).slideUp();
			$('.hint-msg').slideDown('slow');
			firstLetter.textContent = wordList[counter].charAt(0);
			lastLetter.textContent = wordList[counter].charAt((wordList[counter].length - 1));
		}, false);

		function startTimer(duration, display) {
			var timer = duration,
				minutes,
				seconds;

			function showTimer() {
				minutes = parseInt(timer / 60, 10);
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? '0' + minutes : minutes;
				seconds = seconds < 10 ? '0' + seconds : seconds;

				display.textContent = minutes + ':' + seconds;

				if (--timer < 0) {

					$warningAlert.fadeIn('slow');
					$errorMsg.text('Time Up!');
					$warningAlert.fadeOut(3500);

					correctWords.shift();
					jumbledWord.textContent = scrambledArr[counter += 1];

					timer = duration; // Reset timer back to it's initial value

					if (doc('.hint-msg').style.display === 'block') {
						doc('.hint-msg').style.display = 'none';
						hintBtn.style.display = 'block';
					}

				}

				if (correctWords.length === 0) {
					display.textContent = '00:00';
					gameOver();
				}

				nextBtn.addEventListener('click', function () {
					timer = duration; // When the next button is clicked, reset timer back to initial value
				})
			}

			callTimer = setInterval(showTimer, 1000);
		}

		function restartGame() {
			html = doc('html');
			html.classList.add('loading');
			window.setTimeout(reloadPage, 3000);
		}

		function reloadPage() {
			html.classList.remove('loading');
			window.location.reload();
		}

		startTimer(fiveMins, timer);
		pushWord();
		generateScrambledArray(scrambledArr);
		displayWord();
		gameEvents();
	}

	function startGame() {
		var startGameBtn = doc('.launch-game');

		startGameBtn.addEventListener('click', function () {
			this.style.display = 'none';
			doc('.game').style.display = 'block';
			scrambleWordGame();
		}, false);
	}

	startGame();
}());
