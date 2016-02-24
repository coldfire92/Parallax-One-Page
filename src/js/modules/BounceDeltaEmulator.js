
'use strict';

var timer = null;
var currentDelta = 0;
var lastStateDelta = 0;
var returnAnimation = false;


var startReturnAnimation = function(){
	returnAnimation = true;
};

var calcReturnDelta = function(){
	var calcDelta = Math.floor(currentDelta) * 10;
	this.callback(calcDelta);
};

var animateBounce = function(){

	if(startReturnAnimation){
		
		if(currentDelta > 0){
			currentDelta -= 0.12;
		} else {
			currentDelta += 0.12;
		}
	
		if(Math.abs(currentDelta) < 0.5){
			currentDelta = 0;
			returnAnimation = false;
		}
	}

	calcReturnDelta.call(this);

	window.requestAnimationFrame(animateBounce.bind(this));
};

var onScroll = function(event, delta, deltaX, deltaY){
	// console.log(`Delta: ${delta}; DeltaY: ${deltaY}`);
	
	if(Math.abs(delta) > 50 && Math.abs(delta) < 100){
		delta/=10;
	};

	if(Math.abs(delta) >= 100){
		delta/=100;
	};

	currentDelta = delta;

	clearTimeout(timer);
	timer = setTimeout(startReturnAnimation, 120);
};

export default class {

	disable(){
		Hamster(this.el).unwheel(onScroll.bind(this));
	}

	enable(){
		Hamster(this.el).wheel(onScroll.bind(this));
	}
  
    constructor(el, callback){
  	   this.el = el;
  	   this.callback = callback;
  	   animateBounce.call(this);
   }
}
