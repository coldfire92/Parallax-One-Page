
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
	wrapper : document.createElement('div'),
	sections : [],
	bounceWrapper : 3.14,
	maxParralaxWrapper : 30,
	slidesCounts : 4,
	
	autoEnable : true,
	resizeEvents : true,
	callSlidedEventsAfterStart : true,


	easingParallax : 'easeIn',
	animationDuration : 60 * 0.5,
	showItemsAnimatinTime: 750,
	
	slideAnimationTime : 600,
	easingSlideAnimation : 'easeIn',

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

/* Vars
   ========================================================================== */

var timerResizeEvent;

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

var resize = function(){
	console.log('resize');
	this.slidesWrapperInst.resize();
};

class parallaxOnePage {
  
	slideUp(){
		return this.slidesWrapperInst.slideUp();
	}

	slideDown(){
		return this.slidesWrapperInst.slideDown();
	}

	slideTo(indexOrSlideName){
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
