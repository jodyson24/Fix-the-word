/*$(document).ready(function(){
	//Implement countdown timer

	 var clock = $('.clock').FlipClock(10800, {
        countdown: true
      });


	//implement nice scroll

	 $("html").niceScroll({zindex:99999,cursorborder:"1px solid #424242"});
});

$(function){
	$('.bxslider').bxSlider();
};

$(document).ready(function(){
  $('.bxslider').bxSlider();
});*/

var $;
$(document).ready(function () {
	'use strict';

	$("html").niceScroll({zindex: 99999, cursorborder: "1px solid #424242"});

	var clock = $('.clock').FlipClock(10800, {
        countdown: true
    });
});
