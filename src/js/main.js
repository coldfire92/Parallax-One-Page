
'use strict';

import SlidesWrapper from './modules/SlidesWrapper.js';
// import ItemsContainer from './modules/ItemsContainer.js';
import AcceleratorCounter from './modules/AccelerateCounter.js';
import extend from './utils/extend.js';

const defaults = {
	bounceWrapper : 2.14,
	maxParralaxWrapper : 100,
	slideAnimationTime : 900
};

var onScroll = function(speed, direction){
	// console.log(accelerate);
	this.slidesWrapper.update(speed, direction);
	// this.itemsContainer.changeDelta(delta);
};

var move = function(beforeSlide, nextSlide){
	console.log('Move ' + beforeSlide + ' after' + nextSlide);
};

class parallaxOnePage {
  
	moveDown(){

	}

	moveTo(){

	}

	toggleEnable(){
		if(this.enable) {
			this.setDisable();
		} else {
			this.setEnable();
		}
	}

	setEnable(){
		this.bounceDeltaEmulator.enable();
		// this.itemsContainer.enable();
		this.enable = true;
	}

	setDisable(){
		console.log(this.bounceDeltaEmulator);
		this.bounceDeltaEmulator.disable();
		// this.itemsContainer.disable();
		this.enable = false;
	}

	constructor(options){
		this.enable = true;
	 	this.settings = extend(defaults, options);
	 	this.slidesWrapper = new SlidesWrapper(this.settings, move);
	 	// this.itemsContainer = new ItemsContainer(this.settings);
	 	this.bounceDeltaEmulator = new AcceleratorCounter(window, onScroll.bind(this));

	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
