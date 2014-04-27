
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		
		//this.load.setPreloadSprite(this.preloadBar);
		
		this.load.image('bg','assets/'+BasicGame.screen+"/bg.jpg");
		this.load.image('playBtn','assets/'+BasicGame.screen+"/playBtn.png");
	},

	create: function () {
		//this.preloadBar.cropEnabled = false;
		this.ready = true;
		this.state.start('MainMenu');
	},

	update: function () {

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
