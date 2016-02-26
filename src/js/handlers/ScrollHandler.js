'use strict';

const MAX_SCROLL_EVENT_TIME = 300;
const AGAIN_LISTEN_FOR_EVENTS = 50;
const MAX_DELTA_AS_SLOW_SCROLL = 15;
const MAX_ALLOWED_DELTA = 100;

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

	if(absDelta > MAX_ALLOWED_DELTA){ // max delta 
		delta = (currentEventDirection === 'UP') ? MAX_ALLOWED_DELTA : -MAX_ALLOWED_DELTA;
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
		callEvent = (diff < MAX_SCROLL_EVENT_TIME),
		slowScroll = (Math.abs(deltaY) < MAX_DELTA_AS_SLOW_SCROLL);

	// set max delta of current scroll
	if(absDelta > currentEventMaxDelta) {
		currentEventMaxDelta = absDelta;
	}
	
	// clear current scroll
	clearTimeout(timerClearEventTime);
	timerClearEventTime = setTimeout(clearEventTime, AGAIN_LISTEN_FOR_EVENTS);

	// for slow scrolls (touchapad or magic mouse)
	if(slowScroll && (currentEventMaxDelta < MAX_DELTA_AS_SLOW_SCROLL) ){
		return true;		
	}

	return callEvent;
};

var onScroll = function(event, delta, deltaX, deltaY){
	if(isCallEvent(event, delta, deltaX, deltaY)){
		this.onScrollFunction(calcCorrectDelta(deltaY, currentEventDirection), currentEventDirection);
	}
};

export default class {
	constructor(el, onScrollFunction){
		this.el = el;
		this.onScrollFunction = onScrollFunction;
		Hamster(this.el).wheel(onScroll.bind(this));
	}
}
