'use strict';

import AnimationManager from './../animations/AnimationManager.js';
import ParallaxAnimation from './../animations/ParallaxAnimation.js';

var detectSlideChange = function(direction){
	console.log(direction);
	
	var func = (direction == 'up') ? this.moveDown : this.moveUp;
	func.call(this);
};

var afterMove = function(offset){
	this.ParallaxAnimationInst.changeGlobalTranslate(offset);
	this.ParallaxAnimationInst.enable();
	console.log('after move');
};

export default class {

	moveDown(){
		if(this.BeetweenSlidesAnimationInst.isAnimation()){
			return false;
		}

		if(this.currentPage < this.pagesCount){
			++this.currentPage;
			this.move();
			return true;
		}

		return false;
	}

	moveUp(){
		if(this.BeetweenSlidesAnimationInst.isAnimation()){
			return false;
		}

		if(this.currentPage!==1){
			--this.currentPage;
			this.move();
			return true;
		} 

		return false;
	}

	move(id = this.currentPage){	
		console.log('Move to: ' + id);
		var newOffset = (id - 1) * window.innerHeight * -1;
		this.ParallaxAnimationInst.disable();

		console.log('disable');
		
		this.BeetweenSlidesAnimationInst.animateTo( 
			newOffset, 
			this.config.slideAnimationTime, 
			afterMove.bind(this)
		);
	}

    constructor(config, moveCollback){
  	    this.config = config;
  	    
  	    this.BeetweenSlidesAnimationInst = new AnimationManager(config.wrapper);
  	    this.ParallaxAnimationInst = new ParallaxAnimation(config.wrapper, this.config.bounceWrapper);
  		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
  	    this.currentMouseDelta = 0;
  	    
  	    // Slide Animation
  	    this.currentPage = 1;
  	    this.pagesCount = 4;
  	    this.moveCollback = moveCollback;
    }

    update(delta, direction){
	 	this.ParallaxAnimationInst.update(delta);
    }
}