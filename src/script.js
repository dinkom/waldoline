$(document).ready(function(){
	var game = null;

	$('#start').click(function(){
		var grounds = new Grounds();
		var man = new Man('the-man');
		game = new Game(grounds, man);
		game.start();

		$(this).fadeOut(2200);
	});

	$('.option').click(function(){
		game.userClicked($(this).attr('name'));
	});
});
