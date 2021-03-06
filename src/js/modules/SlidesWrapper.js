'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';
import ItemsContainer from './ItemsContainer.js';
import ElementStyleManager from './ElementStyleManager.js';

var callStartShowAnimationCallback = false,
	cssSlideAnimation = false,
	globalBeforeFn,
	globalAfterFn,
	globalStartShowItemsAnimationFn;

/* Debug
   ========================================================================== */

var changeState = function(){
	if(this.config.debug){
		console.log(`Set state "${this.state}"`);
	}
};

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
	this.ItemsContainerInst.hide(this.beforeSlide, this.currentSlide);
	afterSlideCallback.call(this);
	this.ElementStyleManagerInst.setTransition();
	this.ParallaxAnimationInst.changeGlobalTranslate(this.finishOffset);
	this.stateItems = 'NONE';
	this.currentOffset = this.finishOffset;
	
	setTimeout( ()=>{
		callStartShowAnimationCallback = false;
		this.stateWrapper='PARALLAX';
		changeState.call(this);
		cssSlideAnimation = false;
		this.ItemsContainerInst.hide(this.beforeSlide, this.currentSlide);
	}, this.config.timeHoldParallaxAnimationAfterMove );
};

/* Slide Animation
   ========================================================================== */

var animateSlideChange = function(){
	var diff = Math.abs(this.currentSlide - this.beforeSlide);
	var divide = (diff == 1) ? 1 : this.config.makeAnimationFasterWhenSlideToFarSlides; // when slide to far slides, make more fast animation
	
	var slideAnimationTime = (diff * this.config.slideAnimationTime) / divide;
	var slideAnimationTimeBetweenDestinySlide = ((diff - 1) * this.config.slideAnimationTime) / divide;
	var timeToFireShowItemCallback = slideAnimationTimeBetweenDestinySlide + (this.config.timeShowItemAfterStartSlide / divide);

	// show item callback
	setTimeout(startShowAnimation.bind(this), timeToFireShowItemCallback);

	// start animation
	this.ElementStyleManagerInst.setTransition(slideAnimationTime, this.config.easingSlideAnimation);
	this.ElementStyleManagerInst.setTranslateY(this.finishOffset);
	setTimeout(afterSlideAnimation.bind(this), slideAnimationTime + 20);
	beforeSlideCallback.call(this);
	cssSlideAnimation = true;
};

export default class {

	resize(){
		var offset = calcSlideAnimationOffset.call(this);
		this.currentOffset = offset;
		this.ParallaxAnimationInst.changeGlobalTranslate(offset);
	}

	isSlideAnimation(){
		return cssSlideAnimation;
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
		if(id < 1 || id > this.slidesCount || this.stateWrapper !== 'PARALLAX' || id === this.currentSlide) {
			return false;
		}

		this.beforeSlide = this.currentSlide;
		this.currentSlide = id;
		this.finishOffset = calcSlideAnimationOffset.call(this);
		this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();	
		this.stateWrapper = (this.beforeSlide < this.currentSlide) ?  'SLIDE_DOWN' : 'SLIDE_UP';
		this.ItemsContainerInst.hide( this.beforeSlide, this.currentSlide); // animate current slide
		changeState.call(this);
		return true;
	}

    constructor(config){
  	    this.config = config;
  	    this.ItemsContainerInst = new ItemsContainer(config);
  	    this.ParallaxAnimationInst = new ParallaxAnimation(config.wrapper, this.config.bounceWrapper, this.config);
  		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.slideOffsetDetect);
  	    this.ElementStyleManagerInst = new ElementStyleManager(config.wrapper);

  	    // Slide Animation
  	    this.currentOffset = 0;
  	    this.currentSlide = 1;
  	    this.beforeSlide = 1;
  	    this.slidesCount = this.config.slidesCounts;
  		this.stateWrapper = 'PARALLAX';
  		changeState.call(this);

  		this.ItemsContainerInst.show( this.beforeSlide, this.currentSlide); // animate current slide
    }

    update(speed, direction){
    	if(this.stateWrapper === 'PARALLAX'){
    		this.ParallaxAnimationInst.update(speed, direction);
    	} else if(!cssSlideAnimation){
    		animateSlideChange.call(this);
    	}

    	this.ItemsContainerInst.update(speed, direction);

    }
}