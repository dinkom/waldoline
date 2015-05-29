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

var Game = function(grounds, man){
	this.grounds = grounds;
	this.man = man;
	this.coords = null;
	this.round = 1;
	this.rounds = 5;
	var self = this;

	this.start = function(){
		this.startRound();
	};

	this.startRound = function(){
		if (this.round < this.rounds) {
			this.displayStartMessage();
			this.round++;
			this.man.moveToCenter();
			this.coords = this.grounds.displayRandomGround();
		}
		else {
			this.endGame();
		}
	};

	this.displayStartMessage = function(){
		$('#round-container').html('Round ' + this.round + ' of ' + this.rounds).show().delay(700).fadeOut(300);
	};

	this.endGame = function(){
		$('#round-container').html('Done!').fadeIn('fast');
		this.grounds.hideOptions();
		$('#start').show();
	};

	this.userClicked = function(ground) {
		if (this.grounds.checkAnswer(ground)) {
			this.man.moveToGround(this.coords);
			this.grounds.changeColor('green');
			this.grounds.clearGround();
			this.man.resetMan();
			setTimeout(function(){
				self.startRound();
			}, 2800);
		}
		else {
			this.grounds.displayWrongAnswer();
		}
	};
};

var Man = function(manId){
	this.manId = manId;
	this.defaults = {
		'top':'116px',
		'left':'3px'
	};

	this.moveToCenter = function(){
		$('#' + manId).delay(1000).animate({'left': '140px'}, 1000);
	};

	this.moveToGround = function(coords){
		$('#' + this.manId).animate({'left': coords['left'], 'top': coords['top']}, 500);
	};

	this.resetMan = function(){
		$('#' + this.manId).delay(2000).animate({'left': this.defaults['left'], 'top': this.defaults['top']}, 500);
	};
};

var Grounds = function(){
	this.groundsArray = ['y0', 'x4', 'x2', 'x34', 'yx', 'y32x', 'y2x', 'y-x4', 'y-x2', 'y-x34', 'y-x', 'y-32x', 'y-2x'];
	this.quantity = 13;
	this.currentGround = null;
	this.groundsUsed = [];
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

	this.getRandomGround = function() {
		var index = Math.floor(Math.random() * this.quantity);
		return this.groundsArray[index];
	};

	this.displayRandomGround = function(){
		var newGroundFound = false;
		do {
			var ground = this.getRandomGround();
			if (this.groundsUsed.indexOf(ground) == -1) {
				this.groundsUsed.push(ground);
				this.currentGround = ground;
				newGroundFound = true;
			}

		} while(!newGroundFound);

		$('#' + this.currentGround).delay(2000).show("slide", { direction: "right" }, 500);
		setTimeout(this.displayOptions, 2200);
		var coords = this.defaults[this.currentGround];
		var px = coords['top'].substring(0, coords['top'].length - 2);
		var pxNum = parseInt(px);
		pxNum -= 30;
		coords['top'] = pxNum + 'px';
		return coords;
	};

	this.clearGround = function(){
		$('#' + this.currentGround).delay(2000).fadeOut('fast');
	};

	this.displayOptions = function(){
		$('#options').show();
	};

	this.hideOptions = function(){
		$('#options').hide();
	};

	this.checkAnswer = function(ground){
		return this.currentGround == ground;
	};

	this.displayWrongAnswer = function(){
		$('#wrong').fadeIn('fast');
		$('.option').attr('disabled', 'true');
		setTimeout(this.hideWrongAnswer, 2000);
	};

	this.hideWrongAnswer = function(){
		$('.option').removeAttr('disabled');
		$('#wrong').fadeOut('fast');
	};

	this.changeColor = function(color){
		switch (color) {
			case 'green': $('#' + this.currentGround).delay(500).animate({ borderColor: '#9be466' }, 500);
		}
	};
};