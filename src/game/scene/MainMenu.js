
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.add.sprite(0,0,'bg');
		
		//Aligning HUD to view edges
		//Align to left top edge
		var q = this.add.sprite(BasicGame.viewX,BasicGame.viewY,'playBtn');
		
		//Align to bottom right edge
		q.position.x = BasicGame.viewWidth - q.width;
		q.position.y = BasicGame.viewHeight - q.height;
		q.inputEnabled = true;
		q.events.onInputDown.add(this.onClick,this);
	},
	
	onClick:function(){
		console.log("CLICKED"+Math.random());
	},

	update: function () {

		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {



		//	And start the actual game
		this.state.start('Game');

	}

};
