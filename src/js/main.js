
'use strict';

import SlidesWrapper from './modules/SlidesWrapper.js';
import ItemsContainer from './modules/ItemsContainer.js';
import BounceDeltaEmulator from './modules/BounceDeltaEmulator.js';
import extend from './utils/extend.js';

const defaults = {
	var2 : 'aaa',
	var3 : 'sss'
};

var onScroll = function(delta){
	this.slidesWrapper.changeDelta(delta);
};

var move = function(beforeSlide, nextSlide){
	console.log('Move ' + beforeSlide + ' after' + nextSlide);
};

class parallaxOnePage {
  
	moveDown(){

	}

	moveTo(){

	}

	setEnable(){
		this.bounceDeltaEmulator.enable();
		this.enable = true;
	}

	setDisable(){
		this.bounceDeltaEmulator.disable();
		this.enable = false;
	}

	constructor(options){
		this.enable = true;
	 	this.settings = extend(defaults, options);
	 	this.slidesWrapper = new SlidesWrapper(this.settings, move);
	 	this.itemsContainer = new ItemsContainer(this.settings);
	 	this.bounceDeltaEmulator = new BounceDeltaEmulator(window, onScroll.bind(this));

	 	this.setEnable(); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
