'use strict';

import Device from './../utils/Device.js';

var firstEventTime = false,
	currentEventDirection = false,
	currentEventMaxDelta = 0,
	timerClearEventTime;


var clearEventTime = function(){
	firstEventTime = false;
	currentEventDirection = '';
	currentEventMaxDelta = 0;
};

var calcCorrectDelta = function(delta){
	var absDelta = Math.abs(delta);

	if(absDelta > this.config.maxAllowedScrollDelta){ // max delta 
		delta = (currentEventDirection === 'UP') ? this.config.maxAllowedScrollDelta : -this.config.maxAllowedScrollDelta;
	}

	return delta;
};

// repair for magic scroll on mac (chrome, safari)
var isCallEvent = function(event, delta, deltaX, deltaY){
	if(!firstEventTime){
		firstEventTime = Date.now();
		currentEventDirection = (deltaY > 0) ? 'UP' : 'DOWN';
	}

	var currTime = Date.now(),
		absDelta = Math.abs(deltaY),
		diff = currTime - firstEventTime,
		callEvent = ( (diff < this.config.maxScrollEventTime) || (absDelta > 30) ),
		slowScroll = (Math.abs(deltaY) < this.config.maxDeltaWhenSlowScroll);

	// set max delta of current scroll
	if(absDelta > currentEventMaxDelta) {
		currentEventMaxDelta = absDelta;
	}
	
	// clear current scroll
	clearTimeout(timerClearEventTime);
	timerClearEventTime = setTimeout(clearEventTime, this.config.timeAgainListenForScrollEvents);

	// for slow scrolls (touchapad or magic mouse)
	if(slowScroll && (currentEventMaxDelta < this.config.maxDeltaWhenSlowScroll) ){
		return true;		
	}
	
	return callEvent;
};

var onScroll = function(event, delta, deltaX, deltaY){
	if(!this.active){
		return;
	}

	if(isCallEvent.call(this,event, delta, deltaX, deltaY)){
		currentEventDirection = (deltaY > 0) ? 'UP' : 'DOWN';
		this.onScrollFunction(
			calcCorrectDelta.call(this, deltaY, currentEventDirection), 
			currentEventDirection);
	}
};

export default class {

	enable(){
		this.active = true;
		if(!window.Hamster){
			this.config.scrollHandler(window).wheel(onScroll.bind(this));
		} else {
			window.Hamster(window).wheel(onScroll.bind(this));
		}
	}

	disable(){
		this.active = false;
	}

	constructor(config, onScrollFunction){
		this.config = config;
		this.active = false;
		this.onScrollFunction = onScrollFunction;
	}
}
