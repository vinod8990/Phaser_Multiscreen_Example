BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};


BasicGame.Boot = function (game) {
};


BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        //this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
		this.scaleStage();
        this.state.start('Preloader');

    },
    
    scaleStage:function(){
    	if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = BasicGame.gameWidth/2;
        this.scale.minHeight = BasicGame.gameHeight/2;
        this.scale.maxWidth = BasicGame.gameWidth;
        this.scale.maxHeight = BasicGame.gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
		if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER){
			BasicGame.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
			BasicGame.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
			BasicGame.viewWidth = BasicGame.gameWidth-BasicGame.viewX;
			BasicGame.viewHeight = BasicGame.gameHeight-BasicGame.viewY;
		}else{
			BasicGame.viewX = 0;
			BasicGame.viewY = 0;
			BasicGame.viewWidth = BasicGame.gameWidth;
			BasicGame.viewHeight = BasicGame.gameHeight;
		}
	
		document.getElementById("game").style.width = window.innerWidth+"px";
		document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
		document.getElementById("game").style.overflow = "hidden";
    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
		this.scaleStage();
    }

};