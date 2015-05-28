var resetMan = function() {
	$('#the-man').animate({'left': '3px', 'top': '116px'}, 500);
};
var resetField = function() {
	$('.ground').hide();
}
var startGame = function(){
	$('#the-man').animate({'left': '140px'}, 1000);
	$('#start').hide();
};

$(document).ready(function(){
	$('#start').click(startGame);
});