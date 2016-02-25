
'use strict';

import ScrollHandler from './ScrollHandler.js';

var timer = null; 

const ACCELERATION = 1;
const MAX_SPEED = 80;
const WIND = 1.8;

var getCurrentState = function(){    
    var speedAbs = Math.abs(this.currSpeed);

    if( this.scrolling && speedAbs < MAX_SPEED ){
        return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
    } 

    if( !this.scrolling && this.direction === 'DOWN' && this.currSpeed > 0) {
       return 'MOVE_BACK_UP';
    } 

    if( !this.scrolling && this.direction === 'UP'  && this.currSpeed < 0) {
       return 'MOVE_BACK_DOWN';
    }

    if( this.direction === 'UP' && speedAbs >= MAX_SPEED){
       return this.scrolling ? 'SCROLLING_MAX_UP' : 'MOVE_BACK_DOWN';
    }

    if( this.direction === 'UP' && speedAbs >= MAX_SPEED){
       return this.scrolling ? 'SCROLLING_MAX_DOWN' : 'MOVE_BACK_UP';
    }

    if( speedAbs < 1.6){
       return 'CLOSE_ZERO';
    }

    return 'IDLE';
};

var calcSpeed = function(state){
   this.acceleration = ACCELERATION * Math.abs(this.currentDelta);
   // console.log(state);
   
   switch(state){
      case 'SCROLLING_UP'   : this.currSpeed = this.currSpeed + this.acceleration; break;
      case 'SCROLLING_DOWN' : this.currSpeed = this.currSpeed - this.acceleration; break;
      case 'MOVE_BACK_UP'   : this.currSpeed = this.currSpeed - WIND; break;
      case 'MOVE_BACK_DOWN' : this.currSpeed = this.currSpeed + WIND; break;
      case 'SCROLLING_MAX_UP' : this.currSpeed = MAX_SPEED; break;
      case 'SCROLLING_MAX_DOWN' : this.currSpeed = -MAX_SPEED; break;
      case 'CLOSE_ZERO' : this.currSpeed = 0;break;
   }
};

var tick = function(){
	 if(!this.active){
	 	  return;
	 }
    
   var state = getCurrentState.call(this);

   calcSpeed.call(this,state);
   this.callback(this.currSpeed, this.direction);  

	 window.requestAnimationFrame(tick.bind(this));
};

var setNotScrolling = function(){
	 this.scrolling = false;
   this.direction = (this.currSpeed > 0) ? 'DOWN' : 'UP';
};

var onScroll = function(event, delta){
	 this.scrolling = true;
	 this.direction = (delta > 0) ? 'UP' : 'DOWN';
	 this.currentDelta = delta;

	 clearTimeout(timer);
	 timer = setTimeout(setNotScrolling.bind(this), 160);
};

export default class {

	disable(){
		 this.active = false;
		 this.scrollHandlerInst.remove();
	}

	enable(){
		 this.scrollHandlerInst.add();
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
     this.scrollHandlerInst = new ScrollHandler(onScroll.bind(this)); 
  }
}
