/* Store Questions and options in arrays */

var passage1 = [
			['Your body temperature is _______ Fahrenheit', '98.6', ['98.5', '98.6', '98.3']],
			['There are _______ on the surface of the sun', 'sun spots', ['Candles', 'Sun Spots', 'Angels']],
			['How old is the sun approximately?', '4.5 billion years old', ['4.5 million years old', '4.3 million years old', '4.5 billion years old']]
	],
	passage2 = [
				['Who sells butter and to whom?', 'farmer to baker', ['Farmer to baker', 'Baker to farmer', 'Farmer to chef']],
				['From the story, who says he is primitive?', 'the farmer', ['The farmer', 'The Judge', 'The baker']],
				['Who is to blame in the story?', 'the baker', ['The baker', 'The farmer', 'The judge']]
			],
	passage3 = [
				['How many frogs fell into the pit?', '2', ['2', '4', '3']],
				['How many frogs made it out of the pit?', '1', ['2', '1', '3']],
				['Did any frog die in the pit?', 'yes', ['Yes', 'No', 'The story did not say']]
			],
	score = 2, /* Starting the score at 2. Each user gets two free points regardless of quiz performance */
	index = 0,
	progressCounter = 0,
	quizBtn = document.querySelectorAll('.continue'),
	nextBtn = $('.next'),
	passageLength = passage1.length, /* Each passage array shares the same length */
	maxPassageLength = passage1.concat(passage2, passage3).length,
	increaseProgressCounter = (100 / maxPassageLength);

/* On page load, hide Passages, progress bar etc */

$('[class*=passage], .wrapper, .next, .shell .progress').hide();


/* Show first passage, hide welcome text and start quiz button */

function showFirstPassage() {
	$('.start').on('click', function () {
		$('.welcome-text, .start-quiz').hide('slow');
		$('.passage1').slideDown('slow');
	});
}

/* Start the quiz for a particular passage when the continue button is clicked */

function startQuiz(passage, questions) {
	passage.slideUp('slow');
	displayQuestion(questions);
}

/* Place array elements in radio buttons to be dispayed as options for each passage*/

function showOptions(options) {
	var answerHTML = '',
		i = 0,
		len = options.length;

	for (i; i < len; i += 1) {
		answerHTML += ' <input name="quiz" type="radio" value="';
		answerHTML += options[i] + '">' + '<label>' + options[i] + '</label>';
	}
	return answerHTML;
}

/* Display questions for each passage, show options, increment score (based on users performance) etc */

function displayQuestion(quesArr) {
	var currentQ = quesArr.pop(),
		question = $('#question'),
		answer = $('#answers'),
		answers = showOptions(randArrOrder(currentQ[2]));

	/* Randomize the order of the displayed options */

	function randArrOrder(array) {
  		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

  			while (0 !== currentIndex) {

    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

   		 	temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}

  		return array;
	}

	$('.shell .progress').delay(300).slideDown('slow');

	question.html((index += 1) + '. ' + currentQ[0]);

	answer.html(answers);

	/* Set option number back to zero if it exceeds the length of a passage array
		* This ensures consistent question numbering for each passage
	*/

	if (index >= passageLength) {
		index = 0;
	}

	$('#answers input').change(function () {
		$('#answers input').prop('disabled', true);
		if ($(this).val().toLowerCase() === currentQ[1]) {
			score += 2;
			$('#result').slideDown('slow').text('Excellente, you are on fire !').addClass('text-success').removeClass('text-danger');
		} else {
			$('#result').slideDown('slow').text('How did you miss that? The correct answer is ' + '"' + currentQ[1] + '"').addClass('text-danger').removeClass('text-success');
		}
		$('.next').show('slow');
	});
}

/* When the continue button is clicked, it should launch the questions and options for a particular passage */

quizBtn[0].addEventListener('click', function () {
	$('.wrapper').slideDown('slow');
	startQuiz($('.passage1'), passage1);
}, false);

/* When the next button is clicked, it should bring the next set of questions and options */

	// The checkPassageLength function verifies if the passed in array's length is greater than zero
		// If it is, it calls the displayQuestion function until the length of the array is zero
		// When the length of the array is zero, it calls the firstResult function to display the user's result and
		//give the user feedback messages.

function checkPassageLength(passage, callback) {
	if (passage.length > 0) {
		displayQuestion(passage);
	} else {
		return callback();
	}
}

function handleFirstPassageQue() {
	progressCounter += increaseProgressCounter;

	$(this).hide();
	$('#result').text('');

	$('.shell .progress .progress-bar').animate({
		width: progressCounter + '%'
	}, 200);

	checkPassageLength(passage1, firstResult);
}

nextBtn.on('click', handleFirstPassageQue);

function firstResult() {
	var message,
		contBtn = $('<button></button>', {
			'class': 'btn btn-default btn-block next-passage shake shake-little',
			'text': 'Keep Going'
		}),
		point = (score > 0) ? 'points' : 'point',
		complement = (score > 0) ? 'Excellent!' : 'Oops!';

	contBtn.css({
		'display': 'block',
		'margin-top': '15px'
	});

	message = complement + ' you are doing great. You have ' + score + ' ' + point + '<br> Just ' + (40 - score) + ' more points and you will become the top reader<br>';

	$('.inner-shell').addClass('invisible');
	$('.signup-message').html(message).css({
		'visibility': 'visible',
		'top': '120px',
		'left': '175px',
		'text-align': 'center'
	});

	$('.signup-message').append(contBtn);

	contBtn.on('click', function () {
		nextBtn.off('click', handleFirstPassageQue);
		showNextPassage();
	});
}

function nextResult() {
	var message,
		contBtn = $('<button></button>', {
			'class': 'btn btn-default btn-block next-passage shake shake-little',
			'text': 'Keep Going'
		}),
		point = (score > 0) ? 'points' : 'point',
		complement = (score > 0) ? 'Excellent!' : 'Oops!';

	contBtn.css({
		'display': 'block',
		'margin-top': '15px'
	});

	message = complement + ' you are doing great. You have ' + score + ' ' + point + '<br> Just ' + (40 - score) + ' more points and you will become the top reader<br>';

	$('.inner-shell').addClass('invisible');
	$('.signup-message').html(message).css({
		'visibility': 'visible',
		'top': '120px',
		'left': '175px',
		'text-align': 'center'
	});

	$('.signup-message').append(contBtn);

	contBtn.on('click', function () {
		nextBtn.off('click', handleSecondPassageQue);
		showLastPassage();
	});
}

function finalResult() {
	var message,
		contBtn = $('<button></button>', {
			'class': 'btn btn-default btn-block next-passage shake shake-little',
			'text': 'Create an account'
		}),
		point = (score > 0) ? 'points' : 'point',
		complement = (score > 0) ? 'Almost there!' : 'Oops!';

	contBtn.css({
		'display': 'block',
		'margin-top': '15px'
	});

	message = complement + ' You are getting the hang of this. You have ' + score + ' ' + point + '<br>Get ' + (40 - score) + ' more points and you will become the top reader<br><br>Sign up now to save your points!';

	$('.inner-shell').addClass('invisible');
	$('.signup-message').html(message).css({
		'visibility': 'visible',
		'top': '120px',
		'left': '155px',
		'text-align': 'center'
	});

	$('.signup-message').append(contBtn);

	contBtn.on('click', function () {
		nextBtn.off('click', handleLastPassageQue);
		window.location.href = 'signup.html';
	});
}

function handleSecondPassageQue() {
	progressCounter += increaseProgressCounter;

	$(this).hide();
	$('#result').text('');

	$('.shell .progress .progress-bar').animate({
		width: progressCounter + '%'
	}, 200);

	checkPassageLength(passage2, nextResult);
}

function showNextPassage() {
	$('.inner-shell').removeClass('invisible');
	$('.wrapper, #answers, #question').hide();
	$('.shell .progress').fadeOut('slow');
	$('.signup-message').css({
		'top': '-185px'
	});
	$('.passage2').slideDown('slow');

	quizBtn[1].addEventListener('click', function () {
		$('.wrapper').slideDown('slow');
		startQuiz($('.passage2'), passage2);
		$('#answers, #question').show();
	}, false);

	nextBtn.on('click', handleSecondPassageQue);
}

function handleLastPassageQue() {
	progressCounter += increaseProgressCounter;

	$(this).hide();
	$('#result').text('');

	$('.shell .progress .progress-bar').animate({
		width: progressCounter + '%'
	}, 200);

	checkPassageLength(passage3, finalResult);
}

function showLastPassage() {
	$('.inner-shell').removeClass('invisible');
	$('.wrapper, #answers, #question').hide();
	$('.shell .progress').fadeOut('slow');
	$('.signup-message').css({
		'top': '-185px'
	});
	$('.passage3').slideDown('slow');

	quizBtn[2].addEventListener('click', function () {
		$('.wrapper').slideDown('slow');
		startQuiz($('.passage3'), passage3);
		$('#answers, #question').show();
	}, false);

	nextBtn.on('click', handleLastPassageQue);
}



showFirstPassage(); // Invoke showFirstPassage function on page load
