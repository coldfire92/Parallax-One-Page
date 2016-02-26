'use strict';


import ParallaxAnimation from './../animations/ParallaxAnimation.js';

export default class {
  
	slide(from, to){
		this.currentSlide = to;
	
		if(this.configItem.showingDisable){
			return;
		}

		if((to === this.slideNumber)){
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
			}.bind(this), this.configItem.showingDelay + 690);

			setTimeout(function(){
				this.ParallaxAnimationInst.enable();
				this.el.classList.remove(`direction-${direction}`);
				console.log('Finish show up animation');
			}.bind(this), this.configItem.showingDelay + 710);

		} else if(from === this.slideNumber){
			this.el.classList.remove('show');
		}
	}

	enable(){
		this.ParallaxAnimationInst.enable();
	}

	disable(){
		this.ParallaxAnimationInst.disable();
	}

    constructor(el, configItem, slideNumber){
        console.log(slideNumber);
 	    this.el = el;
 	    this.currentSlide = 1;
 	    this.slideNumber = slideNumber;
 	    this.configItem = configItem;
 	    this.ParallaxAnimationInst = new ParallaxAnimation(el, this.configItem.bounce, function(){});
    }

    update(speed, direction){
    	if(this.currentSlide === this.slideNumber){
    		this.ParallaxAnimationInst.update(speed, direction);	
    	}
    }
}