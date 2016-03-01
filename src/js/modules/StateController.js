
'use strict';

import ScrollManager from './../handlers/ScrollHandler.js';

var timer = null,
	  currentSpeed = 0,
    timeSleep = 0,
    sleep = false,
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
   if(!this.active || sleep){
	 	return;
   }

   if(timeSleep > this.config.sleepAfterTicks){
      sleep = true;
      timeSleep = 0;
      return;
   }
  
   var state = getCurrentState.call(this);
   calcSpeed.call(this,state);
   // console.log(`State: ${state}, Scrolling: ${this.scrolling}, speed: ${currentSpeed}, direction: ${this.direction}`);
 
   if(currentSpeed === 0){
      timeSleep++;
   } else if(timeSleep > 0){
      timeSleep--;
   }
   
   tickFn(currentSpeed, this.direction);
   requestAnimationFrame(tick.bind(this));
};

export default class {

  wakeUp(){
    if(sleep){
      sleep = false;
      tick.call(this);
    }
  }

	resetSpeed(){
		currentSpeed = 0;
	}
	
  getCurrentSpeed(){
     return currentSpeed;
  }

	detectScroll(delta, direction){
	   this.scrolling = true;
		 this.direction = direction;
		 this.currentDelta = delta; 
		 clearTimeout(timer);
		 timer = setTimeout(setNotScrolling.bind(this), 160);
     this.wakeUp();
	}

	onTick(fn){
		tickFn = fn;
	}

	constructor(config){
    this.config = config;
		this.scrolling = false;
		this.active = false;
		this.currentDelta = 0;
		this.scrollManagerInst = new ScrollManager(this.config, this.detectScroll.bind(this));
	}

	disable(){
     this.active = false;
     this.scrollManagerInst.disable();
	}

	enable(){
    this.active = true;
    this.scrollManagerInst.enable();
		tick.call(this);
	}

}