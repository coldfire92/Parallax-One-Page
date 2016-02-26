
'use strict';

import StateController from './modules/StateController.js';
import SlidesWrapper from './modules/SlidesWrapper.js';
import extend from './utils/extend.js';

const defaults = {
	wrapper : document.createElement('div'),
	sections : [],
	bounceWrapper : 2.14,
	maxParralaxWrapper : 50,
	slidesCounts : 4,
	easingSlideWrapper : 'easeIn',
	animationDuration : 60 * 0.5,

	timeHoldAnimationAfterMove : 100,
	timeBlockSlideDetectAfterDetect : 2500,
	timeShowItemAfterStartSlide : 300,

	maxSpeedScrolling : 80, // all animations is currentScroll * bounce
	moveBackAccellarate : 2.8, // all animations is currentScroll * bounce

	beforeSlide : function(){},
	afterSlide : function(){},
	startShowItemsAnimation : function(){}
};

class parallaxOnePage {
  
	slideUp(){
		return this.slidesWrapperInst.slideUp();
	}

	slideDown(){
		return this.slidesWrapperInst.slideDown();
	}

	slideTo(index){
		return this.slidesWrapperInst.slideTo(index);
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
	 	this.settings.sections = this.settings.wrapper.querySelectorAll('section');
	 	this.settings.slidesCounts = this.settings.sections.length;

	 	this.slidesWrapperInst = new SlidesWrapper(this.settings);
	 	this.stateControllerInst = new StateController(this.settings);
	 	this.stateControllerInst.onTick(this.slidesWrapperInst.update.bind(this.slidesWrapperInst));
	 	
	 	this.slidesWrapperInst.beforeMove(this.stateControllerInst.resetSpeed.bind(this));


	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
