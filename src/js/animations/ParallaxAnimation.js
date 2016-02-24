
'use strict';

import AnimationManager from './AnimationManager.js';

var setNewDelta = function(delta){

   // if( Math.abs(this.currentDelta) <= Math.abs(delta) ){
      this.currentDelta = delta;
   // }

    // console.log(`Current delta: ${delta}, delta saved for animation ${this.currentDelta}`);
};

export default class {
  
  changeGlobalTranslate(offset){
  	this.transYGlobal = offset;
  }

  disable(){
  	this.active = false;
  }

  enable(){
  	 this.active = true;
  }

  getCurrentOffset(){
  	return this.currentOffset;
  }

  setMaxOffset(afterIncreaseMaxCallback, max){
    this.afterIncreaseMaxCallback = afterIncreaseMaxCallback;
    this.max = max;
  }

  constructor(el, bounce){
  	this.el = el;
  	this.active = true;
  	this.loopActive = false;
    this.bounce = bounce;

    this.timerStartAnimation = null;
    this.timerCallSlideChange = null;
    
    // instances
    this.Animation = new AnimationManager(this.el);

  	// count params
  	this.transYGlobal = 0;
  	this.transYRelative = 0;
  	this.currentDelta = 0;
  	this.currentOffset = 0;

    // after increase
  	this.afterIncreaseMaxCallback = false;
    this.max = false; 
    this.detectNextSlideMove = false;
  }

  update(speed, direction){

  	if(!this.active){
  		return;
  	}


    var relativeY = Math.floor(speed * this.bounce, 2);

    console.log(direction);
    
    if(Math.abs(relativeY) > 90 && this.max){
       this.afterIncreaseMaxCallback(relativeY, direction);
       return;
    }

    var y = relativeY + this.transYGlobal; 
    
    this.el.style.transform = `translate(0px, ${y}px)`;
    
    // startAnimation.call(this);
  }
}