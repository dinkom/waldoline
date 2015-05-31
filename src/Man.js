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