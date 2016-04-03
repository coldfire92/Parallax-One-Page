
'use strict';

import StateController from './modules/StateController.js';
import SlidesWrapper from './modules/SlidesWrapper.js';
import BodyClassManager from './modules/BodyClassManager.js';
import KeyboardHandler from './handlers/KeyboardHandler.js';
import extend from './utils/extend.js';
import isInt from './utils/isInt.js';

/* Config
   ========================================================================== */

const defaults = {

	debug : false,

	wrapper : document.createElement('div'),
	sections : [],
	
	bounceWrapper : 5,
	increaseBounceWindows : 2,

	slideOffsetDetect : 12,
	maxParralaxWrapper : 240,

	slidesCounts : 4,
	
	autoEnable : true,
	resizeEvents : true,
	callSlidedEventsAfterStart : true,

	easingParallax : 'easeIn',
	animationDuration : 60 * 0.5,
	showItemsAnimatinTime: 750,
	
	slideAnimationTime : 500,
	easingSlideAnimation : 'ease-in',
	makeAnimationFasterWhenSlideToFarSlides : 2,

	timeHoldParallaxAnimationAfterMove : 140,
	timeBlockSlideDetectAfterDetect : 1400,
	
	timeShowItemAfterStartSlide : 550,
	resetSpeedAfterSlide : true,

	// state controller
	increaseSpeedAtWindows : 1.2,
	maxSpeedScrolling : 80, // all animations is currentScroll * bounce
	moveBackAccellarate : 2.8, // all animations is currentScroll * bounce

	// scroll handler
	maxScrollEventTime : 300,
	timeAgainListenForScrollEvents : 50,
	maxDeltaWhenSlowScroll : 15,
	maxAllowedScrollDelta : 100,

	sleepAfterTicks : 200,

	beforeSlide : function(){},
	afterSlide : function(){},
	startShowItemsAnimation : function(){}
};

/* Vars
   ========================================================================== */

var timerResizeEvent;

/* Settings
   ========================================================================== */

var beforeSlide = function(beforeSlide, currentSlide){
	this.settings.beforeSlide(beforeSlide, currentSlide);
	// this.bodyClassManagerInst.beforeSlide(beforeSlide, currentSlide);
};

var afterSlide = function(beforeSlide, currentSlide){
	if(this.settings.resetSpeedAfterSlide){
		this.stateControllerInst.resetSpeed();
	}
 	this.settings.afterSlide(beforeSlide, currentSlide);
 	this.bodyClassManagerInst.afterSlide(beforeSlide, currentSlide);
};

var startShowItemsAnimation = function(beforeSlide, currentSlide){
   	this.settings.startShowItemsAnimation(beforeSlide, currentSlide);
   	this.bodyClassManagerInst.startShowItemsAnimation(beforeSlide, currentSlide);         
};

var resize = function(){
	this.slidesWrapperInst.resize();
	this.stateControllerInst.wakeUp();
};

class parallaxOnePage {
  
	slideUp(){
		this.stateControllerInst.wakeUp();
		return this.slidesWrapperInst.slideUp();
	}

	slideDown(){
		this.stateControllerInst.wakeUp();
		return this.slidesWrapperInst.slideDown();
	}

	slideTo(indexOrSlideName){
		this.stateControllerInst.wakeUp();
		var index = isInt(indexOrSlideName) ? indexOrSlideName : this.bodyClassManagerInst.getIndexOfSection(indexOrSlideName);
		return (index) ? this.slidesWrapperInst.slideTo(index) : false;
	}

	toggleEnable(){
		if(this.enable) {
			this.setDisable();
		} else {
			this.setEnable();
		}
	}

	isSlideAnimation(){
		return this.slidesWrapperInst.isSlideAnimation();
	}

	isParallaxAnimation(){
		return (Math.abs(this.stateControllerInst.getCurrentSpeed()) > 0) && !this.isSlideAnimation();
	}

	updateDOM(){
		this.settings.sections = this.settings.wrapper.querySelectorAll('section');
		this.slidesWrapperInst.updateDom(this.settings.sections);	
	}

	setEnable(){
		this.stateControllerInst.enable();
		this.keyboardHandlerInst.enable();
		this.enable = true;
	}

	setDisable(){
		this.stateControllerInst.disable();
		this.keyboardHandlerInst.disable();
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

	 	// Keyboard
	 	this.keyboardHandlerInst = new KeyboardHandler();
	 	this.keyboardHandlerInst.addSpaceAction(this.slideDown.bind(this));
	 	this.keyboardHandlerInst.addArrowUpAction(this.slideUp.bind(this));
	 	this.keyboardHandlerInst.addArrowDownAction(this.slideDown.bind(this));

	 	// enable
	 	if(this.settings.autoEnable){
	 		this.setEnable.call(this); 		
	 	}

	 	// resize
	 	if(this.settings.resizeEvents){
	 		window.addEventListener('resize', () => {
	 			clearTimeout(timerResizeEvent);
	 			timerResizeEvent = setTimeout(resize.bind(this),400);
	 		});
	 	}

	 	// start events
	 	if(this.settings.callSlidedEventsAfterStart){
	 		beforeSlide.call(this,1,1);
	 		afterSlide.call(this,1,1);
	 		startShowItemsAnimation.call(this,1,1);
	 	}
	}
}

if (typeof window.define === 'function' && window.define.amd) {
  // AMD
   window.define('parallaxOnePage', [], function(){
    return parallaxOnePage;
  });
} else if (typeof exports === 'object') {
  // CommonJS
   module.exports = parallaxOnePage;
}

  // Browser global
window.getParallaxOnePage = (config) => new parallaxOnePage(config);
