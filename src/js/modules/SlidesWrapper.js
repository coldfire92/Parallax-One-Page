'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';

var seconds = 0.5;
var duration = 60 * seconds;

var easeIn = function(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

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

var isFinish,
	beforeMoveCallback = function(){};

var animateSlideChange = function(){
	if(isFinish){
		return;
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
		beforeMoveCallback();
		setTimeout(function(){
			isFinish = false;
			this.state='PARALLAX';
		}.bind(this), 200);
		return;
	} 

	this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	this.config.wrapper.style.transform = `translateY(${this.currentOffset}px)`;
};

export default class {

	beforeMove(fn){
		beforeMoveCallback = fn;
	}

	slideDown(){
		if(this.currentPage < this.pagesCount){
			++this.currentPage;
			this.finishOffset = (this.currentPage - 1) * window.innerHeight * -1;
			this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
			this.state = 'SLIDE_DOWN';
			beforeMoveCallback();
			return true;
		}

		return false;
	}

	slideUp(){
		if(this.currentPage!==1){
			--this.currentPage;
			this.finishOffset = (this.currentPage - 1) * window.innerHeight * -1;
			this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();

			console.log(`${this.currentOffset} -> ${this.finishOffset}`);
			
			this.state = 'SLIDE_UP';
			beforeMoveCallback();
			return true;
		} 

		return false;
	}

	slideTo(id = this.currentPage){	
		console.log('Move to: ' + id);
	}

    constructor(config){
  	    this.config = config;
  	    this.ParallaxAnimationInst = new ParallaxAnimation(config.wrapper, this.config.bounceWrapper);
  		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
  	    this.currentOffset = 0;
  	    
  	    // Slide Animation
  	    this.currentPage = 1;
  	    this.pagesCount = 4;
  	 
  		this.state = 'PARALLAX';
    }

    update(speed, direction){
    	if(this.state === 'PARALLAX'){
    		this.ParallaxAnimationInst.update(speed, direction);
    	} else {
    		animateSlideChange.call(this);
    	}
    }
}