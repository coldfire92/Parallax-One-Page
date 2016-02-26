
'use strict';

import ScrollManager from './../handlers/ScrollHandler.js';

var timer = null,
	  currentSpeed = 0,
	  speedAbs;

var tickFn = function(){};

var calcAccelerate = function(){
	  return Math.abs(this.currentDelta) / 2;
};

var getCurrentState = function(){    
    
    speedAbs = Math.abs(currentSpeed);
  
    if( this.scrolling && speedAbs < this.config.maxSpeedScrolling ){
        return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
    } 

    if( speedAbs < 1.6){
       return 'CLOSE_ZERO';
    }

    if( !this.scrolling && currentSpeed < 0) {
       return 'MOVE_BACK_UP';
    } 

    if( !this.scrolling && currentSpeed > 0) {
       return 'MOVE_BACK_DOWN';
    }

    if(speedAbs > (this.config.maxSpeedScrolling - 5) ){
       return this.direction === 'UP' ? 'SCROLLING_MAX_UP' : 'SCROLLING_MAX_DOWN';
    }

    return 'IDLE';
};

var calcSpeed = function(state){
   this.acceleration = calcAccelerate.call(this);
   // console.log(state);
   
   switch(state){
      case 'SCROLLING_UP'   : currentSpeed = currentSpeed + this.acceleration; break;
      case 'SCROLLING_DOWN' : currentSpeed = currentSpeed - this.acceleration; break;
      case 'MOVE_BACK_UP'   : currentSpeed = currentSpeed + this.config.moveBackAccellarate; break;
      case 'MOVE_BACK_DOWN' : currentSpeed = currentSpeed - this.config.moveBackAccellarate; break;
      case 'SCROLLING_MAX_UP' : currentSpeed = this.config.maxSpeedScrolling; break;
      case 'SCROLLING_MAX_DOWN' : currentSpeed = -this.config.maxSpeedScrolling; break;
      case 'CLOSE_ZERO' : currentSpeed = 0;break;
   }
};

var setNotScrolling = function(){
	this.scrolling = false;
};

var tick = function(){
   if(!this.active){
	 	return;
   }
    
   var state = getCurrentState.call(this);
   // console.log(`State: ${state}, Scrolling: ${this.scrolling}, speed: ${currentSpeed}, direction: ${this.direction}`);
 
   calcSpeed.call(this,state);
   tickFn(currentSpeed, this.direction);
   
   requestAnimationFrame(tick.bind(this));
};

export default class {

	resetSpeed(){
		currentSpeed = 0;
	}
	
	detectScroll(delta, direction){
		 // console.log(delta);
	   this.scrolling = true;
		 this.direction = direction;
		 this.currentDelta = delta; 
		 clearTimeout(timer);
		 timer = setTimeout(setNotScrolling.bind(this), 160);
	}

	onTick(fn){
		tickFn = fn;
	}

	constructor(config){
    this.config = config;
		this.scrolling = false;
		this.active = true;
		this.currentDelta = 0;
		this.scrollManagerInst = new ScrollManager(this.config.wrapper, this.detectScroll.bind(this));
	}

	disable(){
		this.active = false;
	}

	enable(){
		this.active = true;
		tick.call(this);
	}

}