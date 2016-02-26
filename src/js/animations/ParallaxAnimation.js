'use strict';

import Easings from './../utils/Easings.js';

var animate = function(){
   this.beginOffset = this.currentOffset;
   this.changeOffset = this.finishOffset - this.beginOffset;
   this.currentOffset = Easings[this.config.easingSlideWrapper](1, this.beginOffset, this.changeOffset, this.config.animationDuration);  
   
   if(Math.abs(this.currentOffset) < 0.1){
      this.currentOffset = 0;
   }
   
   this.el.style.transform = `translateY(${this.currentOffset}px)`; 
};

export default class {
  
  changeGlobalTranslate(offset){
  	this.transYGlobal = offset;
    this.currentOffset = offset;
  }

  disable(){
  	this.active = false;
  }

  enable(){
  	 this.active = true;
  }

  clear(){
     this.currentOffset = 0;
     this.el.style.transform = '';
  }

  getCurrentOffset(){
  	return this.currentOffset;
  }

  setMaxOffset(afterIncreaseMaxCallback, max){
    this.afterIncreaseMaxCallback = afterIncreaseMaxCallback;
    this.max = max;
  }

  constructor(el, bounce, config){
  	this.el = el;
    this.config = config;
  	this.active = true;
    this.bounce = bounce;
    
  	// count params
  	this.transYGlobal = 0;
  	this.currentOffset = 0;
    this.beginOffset = 0;
    this.finishOffset = 0;
    this.changeOffset = 0;

    // after increase
  	this.afterIncreaseMaxCallback = false;
    this.max = false; 
  }

  update(speed, direction){
  	if(!this.active){
  		return;
  	}

    var relativeY = Math.round(speed * this.bounce * 100) / 100;
    this.finishOffset = relativeY + this.transYGlobal; 
        
    if(this.afterIncreaseMaxCallback && this.max){
        if(Math.abs(relativeY) > this.max){
          this.afterIncreaseMaxCallback(relativeY, direction);
        }
    } 
    
    animate.call(this);
  }
}
