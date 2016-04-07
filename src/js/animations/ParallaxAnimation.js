'use strict';

import Easings from './../utils/Easings.js';
import ElementStyleManager from './../modules/ElementStyleManager.js';
import Device from './../utils/Device.js';

var animate = function(){
   this.beginOffset = this.currentOffset;
   this.changeOffset = this.finishOffset - this.beginOffset;
   this.currentOffset = Easings[this.config.easingParallax](1, this.beginOffset, this.changeOffset, this.config.animationDuration);  
   
   if(Math.abs(this.currentOffset) < 0.1){
      this.currentOffset = 0;
   }
   
   this.ElementStyleManagerInst.setTranslateY(this.currentOffset);
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
    this.bounce = Device.isWindows() ? bounce * this.config.increaseBounceWindows : bounce;
    
  	// count params
  	this.transYGlobal = 0;
  	this.currentOffset = 0;
    this.beginOffset = 0;
    this.finishOffset = 0;
    this.changeOffset = 0;

    this.ElementStyleManagerInst = new ElementStyleManager(this.el);

    // after increase
  	this.afterIncreaseMaxCallback = false;
    this.max = false; 
  }

  slideDetect(direction){
     
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
