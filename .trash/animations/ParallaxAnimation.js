
'use strict';

import AnimationManager from './AnimationManager.js';

var setNewDelta = function(delta){

   // if( Math.abs(this.currentDelta) <= Math.abs(delta) ){
      this.currentDelta = delta;
   // }

    // console.log(`Current delta: ${delta}, delta saved for animation ${this.currentDelta}`);
};

var afterMove = function(){
    this.currentOffset = this.transYGlobal + this.transYRelative;

    if(this.detectNextSlideMove){
        clearTimeout(this.timerCallSlideChange);
        this.timerCallSlideChange = setTimeout(function(){
          this.afterIncreaseMaxCallback(this.transYRelative);
        }.bind(this), 100);

        this.detectNextSlideMove = false;
    } else {
        startAnimation.call();
    }
};

var startAnimation = function(){

    this.transYRelative = this.currentDelta * this.bounce;
  
    var to = this.transYGlobal + this.transYRelative;
    
    if(this.max && (Math.abs(this.transYRelative) > this.max)){
       this.transYRelative = this.max;
       this.detectNextSlideMove = true;
    }

    var time = 300;

    this.Animation.animateTo(to, time, afterMove.bind(this));
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

  changeDelta(delta){
  	if(!this.active){
  		return;
  	}

    setNewDelta.call(this,delta);
    clearTimeout(this.timerStartAnimation);
    this.timerStartAnimation = setTimeout(startAnimation.bind(this), 5);

    // startAnimation.call(this);
  }
}