
'use strict';

import StateController from './modules/StateController.js';
import SlidesWrapper from './modules/SlidesWrapper.js';
import BodyClassManager from './modules/BodyClassManager.js';
import extend from './utils/extend.js';


/* Config
   ========================================================================== */

const defaults = {
	wrapper : document.createElement('div'),
	sections : [],
	bounceWrapper : 3.14,
	maxParralaxWrapper : 30,
	slidesCounts : 4,
	
	easingSlideWrapper : 'easeIn',
	easingParallax : 'easeIn',
	animationDuration : 60 * 0.5,
	showItemsAnimatinTime: 750,
	slideAnimationTime : 300,


	timeHoldAnimationAfterMove : 100,
	timeBlockSlideDetectAfterDetect : 2500,
	
	timeShowItemAfterStartSlide : 350,

	// state controller
	maxSpeedScrolling : 80, // all animations is currentScroll * bounce
	moveBackAccellarate : 2.8, // all animations is currentScroll * bounce

	// scroll handler
	maxScrollEventTime : 300,
	timeAgainListenForScrollEvents : 50,
	maxDeltaWhenSlowScroll : 15,
	maxAllowedScrollDelta : 100,

	beforeSlide : function(){},
	afterSlide : function(){},
	startShowItemsAnimation : function(){}
};

/* Settings
   ========================================================================== */

var beforeSlide = function(beforeSlide, currentSlide){
	this.settings.beforeSlide(beforeSlide, currentSlide);
	this.bodyClassManagerInst.beforeSlide(beforeSlide, currentSlide);
    this.stateControllerInst.resetSpeed.bind(this);
};

var afterSlide = function(beforeSlide, currentSlide){
 	this.settings.afterSlide(beforeSlide, currentSlide);
 	this.bodyClassManagerInst.afterSlide(beforeSlide, currentSlide);
};

var startShowItemsAnimation = function(beforeSlide, currentSlide){
   	this.settings.startShowItemsAnimation(beforeSlide, currentSlide);
   	this.bodyClassManagerInst.startShowItemsAnimation(beforeSlide, currentSlide);         
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

	updateDom(){
		this.settings.sections = this.settings.wrapper.querySelectorAll('section');
		this.slidesWrapperInst.updateDom(this.settings.sections);	
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
		
		// settings
	 	this.settings = extend(defaults, options);
	 	this.settings.sections = this.settings.wrapper.querySelectorAll('section');
	 	this.settings.slidesCounts = this.settings.sections.length;

	 	// main
	 	this.slidesWrapperInst = new SlidesWrapper(this.settings);
	 	this.stateControllerInst = new StateController(this.settings);
	 	this.stateControllerInst.onTick(this.slidesWrapperInst.update.bind(this.slidesWrapperInst));
	 
	 	// actions for slides
	 	this.slidesWrapperInst.addBeforeSlide(beforeSlide.bind(this));
	 	this.slidesWrapperInst.addAfterSlide(afterSlide.bind(this));
	 	this.slidesWrapperInst.addStartShowItemsAnimation(startShowItemsAnimation.bind(this));

	 	// bodyClassManager
	 	this.bodyClassManagerInst = new BodyClassManager(this.settings);

	 	// enable
	 	this.setEnable.call(this); 	
	}
}

window.getParallaxOnePage = (config) => new parallaxOnePage(config); 
