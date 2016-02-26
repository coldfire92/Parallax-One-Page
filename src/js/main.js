
'use strict';

import StateController from './modules/StateController.js';
import SlidesWrapper from './modules/SlidesWrapper.js';
import extend from './utils/extend.js';

const defaults = {
	bounceWrapper : 2.14,
	maxParralaxWrapper : 50,
	beforeSlide : function(){},
	afterSlide : function(){},
	whenStartShowHideAnimation : function(){}
};

class parallaxOnePage {
  
	slideUp(){
		this.slidesWrapperInst.moveUp();
	}

	slideDown(){
		this.slidesWrapperInst.moveDown();
	}

	slideTo(index){
		this.slidesWrapperInst.moveTo(index);
	}

	toggleEnable(){
		if(this.enable) {
			this.setDisable();
		} else {
			this.setEnable();
		}
	}

	setEnable(){
		this.stateControllerInst.enable();
		this.enable = true;
	}

	setDisable(){
		this.stateControllerInst.disable();
		this.enable = false;
	}

	constructor(options){
		this.enable = true;
	 	this.settings = extend(defaults, options);
	 		
	 	this.slidesWrapperInst = new SlidesWrapper(this.settings);

	 	this.stateControllerInst = new StateController(this.settings);
	 	this.stateControllerInst.onTick(this.slidesWrapperInst.update.bind(this.slidesWrapperInst));

	 	this.slidesWrapperInst.beforeMove(this.stateControllerInst.resetSpeed.bind(this));

	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
