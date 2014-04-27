/**Injecting no border code for Phaser.ScaleManager*/
Phaser.ScaleManager.prototype.NO_BORDER = 3;
Phaser.ScaleManager.prototype.setScreenSize = function (force) {
        if (typeof force == 'undefined')
        {
            force = false;
        }

        if (this.game.device.iPad === false && this.game.device.webApp === false && this.game.device.desktop === false)
        {
            if (this.game.device.android && this.game.device.chrome === false)
            {
                window.scrollTo(0, 1);
            }
            else
            {
                window.scrollTo(0, 0);
            }
        }

        this._iterations--;

        if (force || window.innerHeight > this._startHeight || this._iterations < 0)
        {
            // Set minimum height of content to new window height
            document.documentElement['style'].minHeight = window.innerHeight + 'px';

            if (this.incorrectOrientation === true)
            {
                this.setMaximum();
            }
            else if (!this.isFullScreen)
            {
                if (this.scaleMode == Phaser.ScaleManager.EXACT_FIT)
                {
                    this.setExactFit();
                }
                else if (this.scaleMode == Phaser.ScaleManager.SHOW_ALL)
                {
                    this.setShowAll();
                }
                else if(this.scaleMode == Phaser.ScaleManager.NO_BORDER)
                {
                	this.setNoBorder();//Don't call setSize
                	clearInterval(this._check);
            		this._check = null;
            		return;
                }
            }
            else
            {
                if (this.fullScreenScaleMode == Phaser.ScaleManager.EXACT_FIT)
                {
                    this.setExactFit();
                }
                else if (this.fullScreenScaleMode == Phaser.ScaleManager.SHOW_ALL)
                {
                    this.setShowAll();
                }
                else if(this.scaleMode == Phaser.ScaleManager.NO_BORDER)
                {
                	this.setNoBorder();//Don't call setSize
                	clearInterval(this._check);
            		this._check = null;
            		return;
                }
            }
            this.setSize();
            clearInterval(this._check);
            this._check = null;
        }

    }
Phaser.ScaleManager.prototype.setNoBorder = function(){
		this.setShowAll();
		var ow = parseInt(this.width,10);
		var oh = parseInt(this.height,10);
		var r = Math.max(window.innerWidth/ow,window.innerHeight/oh);
		this.width = ow*r;
		this.height = oh*r;
		this.setSize2();
}
Phaser.ScaleManager.prototype.setSize2 = function(){
        this.game.canvas.style.width = this.width + 'px';
        this.game.canvas.style.height = this.height + 'px';
        this.game.input.scale.setTo(this.game.width / this.width, this.game.height / this.height);
        if (this.pageAlignHorizontally)
        {
            if (this.incorrectOrientation === false)
            {
                this.margin.x = Math.round((window.innerWidth - this.width) / 2);
                this.game.canvas.style.marginLeft = this.margin.x + 'px';
            }
            else
            {
                this.margin.x = 0;
                this.game.canvas.style.marginLeft = '0px';
            }
        }

        if (this.pageAlignVertically)
        {
            if (this.incorrectOrientation === false)
            {
                this.margin.y = Math.round((window.innerHeight - this.height) / 2);
                this.game.canvas.style.marginTop = this.margin.y + 'px';
            }
            else
            {
                this.margin.y = 0;
                this.game.canvas.style.marginTop = '0px';
            }
        }

        Phaser.Canvas.getOffset(this.game.canvas, this.game.stage.offset);
        this.aspectRatio = this.width / this.height;
        this.scaleFactor.x = this.game.width / this.width;
        this.scaleFactor.y = this.game.height / this.height;
        this.scaleFactorInversed.x = this.width / this.game.width;
        this.scaleFactorInversed.y = this.height / this.game.height;
        this.hasResized.dispatch(this.width, this.height);
        this.checkOrientationState();
}