
'use strict';

var timer = null; 

const ACCELERATION = 1;
const MAX_SPEED = 120;
const WIND = 1.8;

var getCurrentState = function(){    
    var speedAbs = Math.abs(this.currSpeed);

    if( this.scrolling &&  speedAbs < MAX_SPEED ){
        return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
    } 

    if( !this.scrolling && this.direction === 'DOWN' && this.currSpeed > 0) {
       return 'MOVE_BACK_UP';
    } 

    if( !this.scrolling && this.direction === 'UP'  && this.currSpeed < 0) {
       return 'MOVE_BACK_DOWN';
    } 

    return 'IDLE';
};

var calcSpeed = function(state){
   
   // console.log(state);
   this.acceleration = ACCELERATION * Math.abs(this.currentDelta);

   switch(state){
      case 'SCROLLING_UP'   : this.currSpeed = this.currSpeed + this.acceleration; break;
      case 'SCROLLING_DOWN' : this.currSpeed = this.currSpeed - this.acceleration; break;
      case 'MOVE_BACK_UP'   : this.currSpeed = this.currSpeed - WIND; break;
      case 'MOVE_BACK_DOWN' : this.currSpeed = this.currSpeed + WIND; break;
      case 'SCROLLING_MAX_UP'         : this.currSpeed = MAX_SPEED; break;
      case 'SCROLLING_MAX_DOWN'       : this.currSpeed = -MAX_SPEED; break;
      case 'IDLE' : this.currSpeed = 0; break;
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

   if( this.currentDelta > 100 ){
      this.currentDelta = this.currentDelta / 1000;
   } else if( this.currentDelta > 100){
      this.currentDelta = this.currentDelta / 100;
   } else if( this.currentDelta > 10 ){
      this.currentDelta = this.currentDelta / 10;
   }

	 clearTimeout(timer);
	 timer = setTimeout(setNotScrolling.bind(this), 140);
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
