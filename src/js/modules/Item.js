'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';

export default class {
  
	show(from, to){
		this.currentSlide = to;
	
		if(this.configItem.showingDisable || to !== this.slideNumber){
			return;
		}

		var direction = (from > to) ? 'up' : 'down';
		this.ParallaxAnimationInst.clear();
		this.ParallaxAnimationInst.disable();

		this.el.classList.add(`direction-${direction}`);

		setTimeout(function(){
			this.el.classList.add('show');
			this.el.classList.add('animate-show');
		}.bind(this), this.configItem.showingDelay);	

		setTimeout(function(){
			this.el.classList.remove('animate-show');
		}.bind(this), this.configItem.showingDelay + this.mainConfig.showItemsAnimatinTime);

		setTimeout(function(){
			this.ParallaxAnimationInst.enable();
			this.el.classList.remove(`direction-${direction}`);
		}.bind(this), this.configItem.showingDelay + this.mainConfig.showItemsAnimatinTime + 120);
	}

	hide(from, to){
		if(from === this.slideNumber){
			this.el.classList.add('animate-show');
			this.el.classList.remove('show');

			setTimeout(function(){
				this.el.classList.remove('animate-show');
			}.bind(this), 600);
		}
	}

	enable(){
		this.ParallaxAnimationInst.enable();
	}

	disable(){
		this.ParallaxAnimationInst.disable();
	}

    constructor(el, mainConfig, configItem, slideNumber){
 	    this.el = el;
 	    this.mainConfig = mainConfig;
 	    this.currentSlide = 1;
 	    this.slideNumber = slideNumber;
 	    this.configItem = configItem;
 	    this.ParallaxAnimationInst = new ParallaxAnimation(el, this.configItem.bounce, mainConfig);
    }

    update(speed, direction){
    	if(this.currentSlide === this.slideNumber){
    		this.ParallaxAnimationInst.update(speed, direction);	
    	}
    }
}
