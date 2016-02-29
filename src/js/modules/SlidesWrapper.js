'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';
import ItemsContainer from './ItemsContainer.js';

var callStartShowAnimationCallback = false,
	cssSlideAnimation = false,
	globalBeforeFn,
	globalAfterFn,
	globalStartShowItemsAnimationFn;

/* Detect Slide Move
   ========================================================================== */

var blockedSlideDetect = false;
var detectSlideChange = function(speed, direction){
	if(blockedSlideDetect){
		return;
	}

	blockedSlideDetect = true;
	setTimeout(()=> blockedSlideDetect = false, this.config.timeBlockSlideDetectAfterDetect);
	var func = (direction === 'UP') ? this.slideUp : this.slideDown;
	func.call(this);
};

/* Utils
   ========================================================================== */

var calcSlideAnimationOffset = function(){
	return (this.currentSlide - 1) * window.innerHeight * -1;
};

/* Slides Callback
   ========================================================================== */

var startShowAnimation = function(){
	globalStartShowItemsAnimationFn(this.beforeSlide, this.currentSlide);
	this.ItemsContainerInst.show(this.beforeSlide, this.currentSlide);
};

var afterSlideCallback = function(){
	globalAfterFn(this.beforeSlide, this.currentSlide);
};

var beforeSlideCallback = function(){
	globalBeforeFn(this.beforeSlide, this.currentSlide);
};

var afterSlideAnimation = function(){
	afterSlideCallback.call(this);

	this.config.wrapper.style.transition = '';
	this.config.wrapper.style.transitionTimingFunction = '';
	this.ParallaxAnimationInst.changeGlobalTranslate(this.finishOffset);
	this.currentOffset = this.finishOffset;
	
	setTimeout( ()=>{
		callStartShowAnimationCallback = false;
		this.state='PARALLAX';
		cssSlideAnimation = false;
		this.ItemsContainerInst.hide(this.beforeSlide, this.currentSlide);
	}, this.config.timeHoldParallaxAnimationAfterMove );
};

/* Slide Animation
   ========================================================================== */

var animateSlideChange = function(){	
	if(!callStartShowAnimationCallback){
		var diff = Math.abs(this.currentSlide - this.beforeSlide);
		var timeScrollBeforeDestinySlide = (diff - 1) * this.config.slideAnimationTime;
		var timeFireEvent = this.config.timeShowItemAfterStartSlide + timeScrollBeforeDestinySlide;

		setTimeout(startShowAnimation.bind(this), timeFireEvent);
		callStartShowAnimationCallback = true;
	}

	if(!cssSlideAnimation){
		this.config.wrapper.style.transition = `all ${this.config.slideAnimationTime}ms`;
		this.config.wrapper.style.transform = `translateY(${this.finishOffset}px)`;
		this.config.wrapper.style.transitionTimingFunction = this.config.easingSlideAnimation;
		setTimeout(afterSlideAnimation.bind(this), this.config.slideAnimationTime + 20);
		cssSlideAnimation = true;
	}
};

export default class {

	resize(){
		var offset = calcSlideAnimationOffset.call(this);
		this.currentOffset = offset;
		this.ParallaxAnimationInst.changeGlobalTranslate(offset);
	}

	addBeforeSlide(fn){
		globalBeforeFn = fn;
	}

	addAfterSlide(fn){
		globalAfterFn = fn;
	}

	addStartShowItemsAnimation(fn){
		globalStartShowItemsAnimationFn = fn;
	}

	updateDom(sections){
		this.ItemsContainerInst.updateDom(sections, this.currentSlide);
	}

	slideDown(){
		if(this.currentSlide < this.slidesCount){
			var id = this.currentSlide + 1;
			this.slideTo(id);
			return true;
		}

		return false;
	}

	slideUp(){
		if(this.currentSlide!==1){
			var id = this.currentSlide - 1;
			this.slideTo(id);
			return true;
		} 

		return false;
	}

	slideTo(id){	
		if(id < 1 || id > this.slidesCount || this.state !== 'PARALLAX' || id === this.currentSlide) {
			return false;
		}

		this.beforeSlide = this.currentSlide;
		this.currentSlide = id;
		this.finishOffset = calcSlideAnimationOffset.call(this);
		this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();	
		this.state = (this.beforeSlide < this.currentSlide) ?  'SLIDE_DOWN' : 'SLIDE_UP';
		beforeSlideCallback.call(this);
		return true;
	}

    constructor(config){
  	    this.config = config;
  	    this.ItemsContainerInst = new ItemsContainer(config);
  	    this.ParallaxAnimationInst = new ParallaxAnimation(config.wrapper, this.config.bounceWrapper, this.config);
  		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
  	       
  	    // Slide Animation
  	    this.currentOffset = 0;
  	    this.currentSlide = 1;
  	    this.beforeSlide = 1;
  	    this.slidesCount = this.config.slidesCounts;
  		this.state = 'PARALLAX';

  		this.ItemsContainerInst.show( this.beforeSlide, this.currentSlide); // animate current slide
    }

    update(speed, direction){
    	console.log(this.state);
    	
    	if(this.state === 'PARALLAX'){
    		this.ParallaxAnimationInst.update(speed, direction);
    		this.ItemsContainerInst.update(speed, direction);
    	} else {
    		animateSlideChange.call(this);
    	}
    }
}