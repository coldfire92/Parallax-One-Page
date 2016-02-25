
'use strict';

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

  constructor(el, bounce){
  	this.el = el;
  	this.active = true;
    this.bounce = bounce;
    
  	// count params
  	this.transYGlobal = 0;
  	this.currentOffset = 0;

    // after increase
  	this.afterIncreaseMaxCallback = false;
    this.max = false; 
  }

  update(speed, direction){
  	if(!this.active){
  		return;
  	}

    var relativeY = Math.round(speed * this.bounce * 100) / 100;

    if( this.afterIncreaseMaxCallback && this.max){
        if(Math.abs(relativeY) > this.max){
          this.afterIncreaseMaxCallback(relativeY, direction);
        }
    }
    if(this.currentOffset !== (relativeY + this.transYGlobal)){
        this.currentOffset = relativeY + this.transYGlobal; 
        this.el.style.transform = `translateY(${this.currentOffset}px)`; 
    }
  }
}