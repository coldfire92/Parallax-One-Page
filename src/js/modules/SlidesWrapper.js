'use strict';

import ParallaxAnimation from './../animations/ParallaxAnimation.js';

const animationDirections = {
	'SLIDE_UP' : {
		condition : '>',
		'sign' : '+'
	},
	'SLIDE_DOWN' : {
		condition : '<',
		'sign' : '-'
	}
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

var animateSlideChange = function(speed){

	if(isFinish){
		return;
	}

	eval(`this.currentOffset ${animationDirections[this.state].sign}=12`);	
	eval(`isFinish = this.currentOffset ${animationDirections[this.state].condition} this.toScroll`);

	if(isFinish){
		this.ParallaxAnimationInst.changeGlobalTranslate(this.toScroll);
		this.currentOffset = this.toScroll;
		// this.moveCollback((this.state === 'SLIDE_UP') ? this.currentPage+1 : this.currentPage-1 , this.currentPage);
		isFinish = true;
		beforeMoveCallback();
		setTimeout(function(){
			this.state='PARALLAX';
			isFinish = false;
			console.log('enabel parallax');
		}.bind(this), 200);
	} 

	// console.log(`${this.currentOffset} / ${this.toScroll}`);
	this.config.wrapper.style.transform = `translateY(${this.currentOffset}px)`;
};

export default class {

	beforeMove(fn){
		beforeMoveCallback = fn;
	}

	slideDown(){
		if(this.currentPage < this.pagesCount){
			++this.currentPage;
			this.toScroll = (this.currentPage - 1) * window.innerHeight * -1;
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
			this.toScroll = (this.currentPage - 1) * window.innerHeight * -1;
			this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
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
  	    this.currentMouseDelta = 0;
  	    
  	    // Slide Animation
  	    this.currentPage = 1;
  	    this.pagesCount = 4;
  	 
  		this.state = 'PARALLAX';
    }

    update(speed, direction){
    	if(this.state === 'PARALLAX'){
    		this.ParallaxAnimationInst.update(speed, direction);
    	} else {
    		animateSlideChange.call(this, speed);
    	}
    }
}