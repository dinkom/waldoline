$(document).ready(function(){
	$('#start').click(function(){
		var grounds = new Grounds();
		var man = new Man('the-man');
		var game = new Game(grounds, man);
		game.start();

		$(this).hide();
	});
});

var Game = function(grounds, man){
	this.grounds = grounds;
	this.man = man;

	this.start = function(){
		this.man.moveToCenter();
		var coords = this.grounds.displayRandomGround();
	};
};

var Man = function(manId){
	this.manId = manId;
	this.defaults = {
		'top':'116px',
		'left':'3px'
	};

	this.moveToCenter = function(){
		$('#' + manId).animate({'left': '140px'}, 1000);
	};

	this.resetMan = function(){
		$('#' + this.manId).animate({'left': this.defaults['left'], 'top': this.defaults['top']}, 500);
	};
};

var Grounds = function(){
	this.quantity = 13;
	this.groundsArray = ['y0', 'x4', 'x2', 'x34', 'yx', 'y32x', 'y2x', 'y-x4', 'y-x2', 'y-x34', 'y-x', 'y-32x', 'y-2x'];
	this.defaults = {
		'y0': {'top':'147px', 'right':'0', 'left':'258px', 'bottom':'220px'},
		'x4': {'top':'119px', 'right':'0', 'left':'258px', 'bottom':'220px'},
		'x2': {'top':'91px', 'right':'0', 'left':'258px', 'bottom':'225px'},
		'x34': {'top':'64px', 'right':'0', 'left':'258px', 'bottom':'240px'},
		'yx': {'top':'37px', 'right':'0', 'left':'258px', 'bottom':'260px'},
		'y32x': {'top':'64px', 'right':'0', 'left':'202px', 'bottom':'250px'},
		'y2x': {'top':'37px', 'right':'0', 'left':'202px', 'bottom':'260px'},
		'y-x4': {'top':'175px', 'right':'0', 'left':'258px', 'bottom':'220px'},
		'y-x2': {'top':'202px', 'right':'0', 'left':'258px', 'bottom':'225px'},
		'y-x34': {'top':'230px', 'right':'0', 'left':'258px', 'bottom':'240px'},
		'y-x': {'top':'257px', 'right':'0', 'left':'258px', 'bottom':'260px'},
		'y-32x': {'top':'230px', 'right':'0', 'left':'202px', 'bottom':'250px'},
		'y-2x': {'top':'257px', 'right':'0', 'left':'202px', 'bottom':'260px'},
	};

	this.cssClass = 'ground';

	this.getRandomGround = function() {
		var index = Math.floor(Math.random() * this.quantity);
		return this.groundsArray[index];
	};

	this.displayRandomGround = function(){
		var groundId = this.getRandomGround();
		$('#' + groundId).delay(1000).show("slide", { direction: "right" }, 500);
		return this.defaults[groundId];
	};

	this.resetGrounds = function(){
		$('.' + this.cssClass).hide();
	};
};