var Game = function(grounds, man){
	this.grounds = grounds;
	this.man = man;
	this.coords = null;
	this.round = 1;
	this.rounds = 5;
	this.wrongAnswers = 0;
	this.startTime = null;
	this.endTime = null;
	var self = this;

	this.start = function(){
		this.startTime = new Date();
		this.startRound();
		if (this.round > 1) {
			this.grounds.resetColors();
		}
	};

	this.startRound = function(){
		if (this.round <= this.rounds) {
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
		this.endTime = new Date();
		var timeElapsed = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
		$('#end-game').html('Done!<br /><small>Wrong answers: ' + this.wrongAnswers + '<br />Time: ' + timeElapsed + ' seconds</small>').fadeIn('fast');
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
			this.wrongAnswers++;
		}
	};
};