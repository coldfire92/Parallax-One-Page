'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';

export default class {
  
	slide(from, to){
		this.currentSlide = to;

		if(to === this.slideNumber){

			var direction = (from > to) ? 'up' : 'down';
			this.ParallaxAnimationInst.clear();
			this.ParallaxAnimationInst.disable();

			this.el.classList.add(`direction-${direction}`);

			setTimeout(function(){
				this.el.classList.add('show');
				this.el.classList.add('animate-show');
			}.bind(this), 150);	

			setTimeout(function(){
				this.el.classList.remove('animate-show');
			}.bind(this), 850);

			setTimeout(function(){
				this.ParallaxAnimationInst.enable();
				this.el.classList.remove(`direction-${direction}`);
			}.bind(this), 900);

		} else if(from === this.slideNumber){
			this.el.classList.remove('show');
		}
	}

	enable(){
		console.log('enable item');
		this.ParallaxAnimationInst.enable();
	}

	disable(){
		this.ParallaxAnimationInst.disable();
	}

    constructor(el, bounce, slideNumber){
        console.log(slideNumber);
 	    this.el = el;
 	    this.currentSlide = 1;
 	    this.slideNumber = slideNumber;
 	    this.bounce = bounce;
 	    this.ParallaxAnimationInst = new ParallaxAnimation(el, bounce, function(){});
    }

    update(speed, direction){
    	if( this.currentSlide === this.slideNumber){
    		this.ParallaxAnimationInst.update(speed, direction);	
    	}
    }
}
