(function () {
	'use strict';
	$('.inner-shell').hide().delay(1000).slideDown('slow');
	$('.intro-msg').fadeIn(1500);

	var headingMsg = ['Read for good', 'Get rewarded for reading', 'Have fun while learning'],
		messages = ['Join and compete with your peers, <br>it\'s easy', 'Get in on the fun by signing up', 'How cool is that?'],
		heading = $('.intro-msg h1'),
		message = $('.intro-msg p');

	function nextMsg() {
		if (headingMsg.length > 0) {
			heading.html(headingMsg.shift()).fadeIn(1000).delay(1500).fadeOut(2500, nextMsg);
			message.html(messages.shift()).fadeIn(1000).delay(1500).fadeOut(2500);
		} else {
			headingMsg.push('Read for good', 'Get rewarded for reading', 'Have fun while learning');
			messages.push('Join and compete with your peers, <br>it\'s easy', 'Get in on the fun by signing up', 'How cool is that?');
			nextMsg();
		}
	}

	nextMsg();
}());
