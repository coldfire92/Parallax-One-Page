'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';
import ItemsContainer from './ItemsContainer.js';

var seconds = 0.5;
var duration = 60 * seconds;

var easeIn = function(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

var isFinish,
	callStartShowAnimationCallback = false,
	globalBeforeFn;

/* Detect Slide Move
   ========================================================================== */

var blockedSlideDetect = false;
var detectSlideChange = function(speed, direction){
	if(blockedSlideDetect){
		return;
	}

	blockedSlideDetect = true;
	setTimeout(()=> blockedSlideDetect = false, 2500);
	var func = (direction === 'UP') ? this.slideUp : this.slideDown;
	func.call(this);
};

/* Slides Callback
   ========================================================================== */

var startShowAnimation = function(){
	console.log(`startShowAnimation ${this.beforeSlide} => ${this.currentSlide}`);
	this.ItemContainer.slide(this.beforeSlide, this.currentSlide);
};

var afterSlideCallback = function(){
	console.log(`afterSlideCallback ${this.beforeSlide} => ${this.currentSlide}`);	
};

var beforeSlideCallback = function(){
	console.log(`beforeSlideCallback ${this.beforeSlide} => ${this.currentSlide}`);
	globalBeforeFn(this.beforeSlide, this.currentSlide);
};

/* Animation
   ========================================================================== */

var animateSlideChange = function(){
	if(isFinish){
		return;
	}
	
	if(!callStartShowAnimationCallback){
		setTimeout(startShowAnimation.bind(this), 300);
		callStartShowAnimationCallback = true;
	}

	var absCurrentOffset = Math.abs(this.currentOffset),
		absFinish = Math.abs(this.finishOffset);

	if(this.state === 'SLIDE_DOWN'){
		isFinish = (absCurrentOffset > (absFinish - 1));
		this.beginOffset = this.currentOffset;
    	this.changeOffset = this.finishOffset - this.beginOffset;
    	// console.log(`Animate slide up from ${this.beginOffset} to ${this.finishOffset} with ${this.changeOffset} `);
    	this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	} else {
		isFinish = (absCurrentOffset < (absFinish + 1));
		this.beginOffset = this.currentOffset;
    	this.changeOffset = Math.abs(this.finishOffset - this.beginOffset);
    	// console.log(`Animate slide up from ${this.beginOffset} to ${this.finishOffset} with ${this.changeOffset} `);
    	this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	}

	if(isFinish){
		this.ParallaxAnimationInst.changeGlobalTranslate(this.finishOffset);
		this.currentOffset = this.finishOffset;
		setTimeout(function(){
			isFinish = false;
			callStartShowAnimationCallback = false;
			afterSlideCallback.call(this);
			this.state='PARALLAX';
		}.bind(this), 100);
		return;
	} 

	this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	this.config.wrapper.style.transform = `translateY(${this.currentOffset}px)`;
};

export default class {

	beforeMove(fn){
		globalBeforeFn = fn;
	}

	slideDown(){
		if(this.currentSlide < this.slidesCount){
			this.beforeSlide = this.currentSlide;
			++this.currentSlide;
			this.finishOffset = (this.currentSlide - 1) * window.innerHeight * -1;
			this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
			this.state = 'SLIDE_DOWN';
			beforeSlideCallback.call(this);
			return true;
		}

		return false;
	}

	slideUp(){
		if(this.currentSlide!==1){
			this.beforeSlide = this.currentSlide;
			--this.currentSlide;
			this.finishOffset = (this.currentSlide - 1) * window.innerHeight * -1;
			this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();	
			this.state = 'SLIDE_UP';
			beforeSlideCallback.call(this);
			return true;
		} 

		return false;
	}

	slideTo(id = this.currentSlide){	
		console.log('Move to: ' + id);
	}

    constructor(config){
  	    this.config = config;
  	
  	    this.ItemContainer = new ItemsContainer(config);

  	    this.ParallaxAnimationInst = new ParallaxAnimation(config.wrapper, this.config.bounceWrapper);
  		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
  	       
  	    // Slide Animation
  	    this.currentOffset = 0;
  	    this.currentSlide = 1;
  	    this.beforeSlide = 1;
  	    this.slidesCount = 4;
  		this.state = 'PARALLAX';

  		this.ItemContainer.slide( this.beforeSlide, this.currentSlide); // aniamte current slide
    }

    update(speed, direction){
    	if(this.state === 'PARALLAX'){
    		this.ParallaxAnimationInst.update(speed, direction);
    		this.ItemContainer.update(speed, direction);
    	} else {
    		animateSlideChange.call(this);
    	}
    }
}