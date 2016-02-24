
'use strict';

const PARALLAX = 8.14;
const MAX_CONTORTION = 50;

var setTransform = function(){
	this.currentOffset = this.transYGlobal + this.transYRelative; 
	this.el.style.transform = 'translate3d(0px, ' + this.currentOffset + 'px,0px)';
};

var animate = function(){
	this.transYRelative = this.currentDelta * PARALLAX;
	
	if(Math.abs(this.transYRelative) > MAX_CONTORTION){
		this.afterIncreaseMaxCallback(this.transYRelative);
		this.transYRelative = 0;
		this.loopActive = false;
		return;
	}	

	setTransform.call(this);

	window.requestAnimationFrame(animate.bind(this));
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

  constructor(el, afterIncreaseMaxCallback){
  	this.el = el;
  	this.active = true;
  	this.loopActive = false;
  	
  	// count params
  	this.transYGlobal = 0;
  	this.transYRelative = 0;
  	this.currentDelta = 0;
  	this.currentOffset = 0;

  	this.afterIncreaseMaxCallback = afterIncreaseMaxCallback;
  }

  changeDelta(delta){
  	if(!this.active){
  		return;
  	}

  	this.currentDelta = delta;
  	if(!this.loopActive){
  		this.loopActive = true;
  		animate.call(this);
  	}	
  }

}