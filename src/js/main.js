
'use strict';

import SlidesWrapper from './modules/SlidesWrapper.js';
import ItemsContainer from './modules/ItemsContainer.js';
import Ticker from './modules/Ticker.js';
import extend from './utils/extend.js';

const defaults = {
	bounceWrapper : 2.14,
	maxParralaxWrapper : 70,
};

var onScroll = function(speed, direction){
	// console.log(accelerate);
	this.slidesWrapper.update(speed, direction);
	this.itemsContainer.update(speed, direction);
};

var slide = function(beforeSlide, nextSlide){
	console.log('Move ' + beforeSlide + ' to' + nextSlide);
	this.itemsContainer.slide(beforeSlide, nextSlide);
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
		this.tickerInst.enable();
		this.itemsContainer.enable();
		this.enable = true;
	}

	setDisable(){
		console.log(this.bounceDeltaEmulator);
		this.tickerInst.disable();
		this.itemsContainer.disable();
		this.enable = false;
	}

	constructor(options){
		this.enable = true;
	 	this.settings = extend(defaults, options);
	 	this.slidesWrapper = new SlidesWrapper(this.settings, slide.bind(this));
	 	this.itemsContainer = new ItemsContainer(this.settings);
	 	this.tickerInst = new Ticker(window, onScroll.bind(this));

	 	slide.call(this,1,1);

	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
