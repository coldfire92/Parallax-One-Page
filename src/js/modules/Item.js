'use strict';

// import AnimationManager from './../animations/AnimationManager.js';
import ParallaxAnimation from './../animations/ParallaxAnimation.js';

export default class {
  
	enable(){
		console.log('enable item');
		this.ParallaxAnimationInst.enable();
	}

	disable(){
		this.ParallaxAnimationInst.disable();
	}

    constructor(el, bounce){
 	   this.el = el;
 	   this.bounce = bounce;
 	   this.ParallaxAnimationInst = new ParallaxAnimation(el, bounce, function(){});
  		
    }

    update(speed, direction){
  	    this.ParallaxAnimationInst.update(speed, direction);
    }

}
