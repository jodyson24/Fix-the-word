(function () {
	'use strict';

	var questions = [
		['Your body temperature is _______ Fahrenheit', '98.6', ['98.5', '98.6', '98.3']],
		['There are _______ on the surface of the sun', 'sun spots', ['Candles', 'Sun Spots', 'Angels']],
		['How old is the sun approximately?', '4.5 billion years old', ['4.5 million years old', '4.3 million years old', '4.5 billion years old']]
	],
		total = questions.length,
		quizArea = $('.shell'),
		passage = $('.passage'),
		nextBtn,
		progressCounter = 0,
		score = 0,
		highestScore = 5 * total,
		index = 0;

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

	function displayQuestion() {
		var currentQ = questions.pop(),
			question = $('#question'),
			answer = $('#answers'),
			answers = showOptions(randArrOrder(currentQ[2]));

		function randArrOrder(array) {
  			var currentIndex = array.length,
				temporaryValue,
				randomIndex;

  			// While there remain elements to shuffle...
  			while (0 !== currentIndex) {

    		// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

   		 	// And swap it with the current element.
   		 	temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}

  			return array;
	}

		$('.shell .progress').delay(300).slideDown('slow');

		question.html((index += 1) + '. ' + currentQ[0]);

		answer.html(answers);

		$('#answers input').change(function () {
			$('#answers input').prop('disabled', true);
			if ($(this).val().toLowerCase() === currentQ[1]) {
				score += 5;
				$('#result').slideDown('slow').text('Excellente, you are on fire !').addClass('text-success').removeClass('text-danger');
			} else {
				$('#result').slideDown('slow').text('How did you miss that? The correct answer is ' + '"' + currentQ[1] + '"').addClass('text-danger').removeClass('text-success');
			}
			$('.next').show('slow');
		});
	}
	function showPassage() {
		passage.fadeIn('slow');
		var contBtn = $('.continue');

		contBtn.on('click', function () {
			passage.slideUp('slow');
			$('.wrapper').slideDown('slow');
			displayQuestion();
		})
	}

	function startQuiz() {
		var startBtn = $('.start'),
			nextBtn = $('.next');
		passage.hide();
		$('.wrapper').hide();
		$('.shell .progress').hide();

		nextBtn.hide();

		startBtn.click(function () {
			$('.welcome-text, .start-quiz').hide('slow');
			showPassage();
		});
	}


	function giveResult() {
		var message;
		if (score === highestScore) {
			message = '<p>You got all questions correctly, you are doing great !! <a href="signup.html" class="btn btn-primary">Keep going &rarr;</a></p>';
		} else if (score === (highestScore - 5)) {
			message = '<p>You missed one question but you are doing great !! <a href="signup.html" class="btn btn-primary">Keep going &rarr;</a></p>';
		} else if (score === (highestScore - 10)) {
			message = '<p>You missed two questions but you are doing great !! <a href="signup.html" class="btn btn-primary">Keep going &rarr;</a></p>';
		} else if (score === (highestScore - highestScore)) {
			message = '<p>Oops!, you didn\'t get any questions correctly, you can do better !! <a href="signup.html" class="btn btn-primary">Keep going &rarr;</a></p>';
		}

		$('.inner-shell').addClass('invisible');
		$('.signup-message').html(message).css({
			'visibility': 'visible',
			'top': '140px',
			'right': '115px'
		}, 200);
	}

	$('.next').click(function () {
		progressCounter += (100 / total);

		$(this).hide();

		$('#result').text('');

		$('.shell .progress .progress-bar').animate({
			width: progressCounter + '%'
		}, 200);

		if (questions.length > 0) {
			displayQuestion();
		} else {
			giveResult();
		}
	});

	startQuiz();
}());
