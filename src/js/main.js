
'use strict';

import StateController from './modules/StateController.js';
import extend from './utils/extend.js';

const defaults = {
	bounceWrapper : 2.14,
	maxParralaxWrapper : 70,
};

var slide = function(beforeSlide, nextSlide){
	console.log('Move ' + beforeSlide + ' to' + nextSlide);
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
		this.enable = true;
	}

	setDisable(){
		this.enable = false;
	}

	constructor(options){
		this.enable = true;
	 	this.settings = extend(defaults, options);
	 	
	 	new StateController();


	 	slide.call(this,1,1);

	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
