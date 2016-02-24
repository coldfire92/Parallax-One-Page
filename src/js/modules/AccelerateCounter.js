
'use strict';

var timer = null; 

const ACCELERATION = 1;
const MAX_SPEED = 40;
const WIND = 0.8;

var calcSpeed = function(){
	var state;

	var SpeedAbs = Math.abs(this.currSpeed);

	var acceleration = ACCELERATION * Math.abs(this.currentDelta);
	
	if( Math.abs(this.currSpeed) < 0.2 ){
    	this.currSpeed = 0;
    }
  
	if ( this.scrolling && Math.abs(this.currSpeed) < MAX_SPEED) {
		state = 'accelerating';
        if( this.direction === 'up'){
        	this.currSpeed = this.currSpeed + acceleration;
        } else {
        	this.currSpeed = this.currSpeed - acceleration;
        }
    } else if( Math.abs(this.currSpeed) > 0.2 ) {
    	state = 'move back';

    	if(Math.abs(this.currSpeed) < 0.6){
    		this.currSpeed = 0;
    	}
 
    	this.direction = (this.currSpeed > 0 ) ? 'down' : 'up';
    	if(this.direction === 'up'){
    		this.currSpeed = this.currSpeed + WIND;
	    } else {
	    	this.currSpeed = this.currSpeed - WIND;
	    } 
    } else {
    	state = 'idle';
    	this.currSpeed = 0;
    }

    // console.log(`Statee : ${state}; Directon ${this.direction}; Speed: ${this.currSpeed}; SpeedAbs: ${SpeedAbs}`);
};

var tick = function(){
	if(!this.active){
		return;
	}

	var lastSpeed = this.currSpeed;
    calcSpeed.call(this);

    // if( (Math.abs(lastSpeed) - Math.abs(this.currSpeed)) < 0.5){
    // } else {
   	// 	this.callback(this.currSpeed);	
    // }

    this.callback(this.currSpeed, this.direction);	

	window.requestAnimationFrame(tick.bind(this));
};

var setNotScrolling = function(){
	this.scrolling = false;
};

var onScroll = function(event, delta){
	this.scrolling = true;
	this.direction = (delta > 0) ? 'up' : 'down';
	this.currentDelta = delta;

	clearTimeout(timer);
	timer = setTimeout(setNotScrolling.bind(this), 100);
};

export default class {

	disable(){
		this.active = false;
		// Hamster(this.el).unwheel(onScroll.bind(this));
	}

	enable(){
		Hamster(this.el).wheel(onScroll.bind(this));
		this.active = true;
		tick.call(this);
	}
  
    constructor(el, callback){
  	   this.el = el;
  	   this.callback = callback;
  	   this.scrolling = false;
  	   this.currSpeed = 0;
  	   this.direction = 'up';
  	   this.active = true;
   }
}
