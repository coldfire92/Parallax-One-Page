
'use strict';

export default class {

	setTranslateY(offsetY = ''){
		var newTranslate = (offsetY==='') ? '' : `translateY(${offsetY}px)`;
		this.el.style.transform = newTranslate;
	}

	setTransition(transitionTime = 0, timingFunction = ''){
		var newTransition = (transitionTime===0) ? '' : `all ${transitionTime}ms`;
		this.el.style.transition = newTransition; 
		this.el.style.transitionTimingFunction = timingFunction;
	}

	constructor(el){
		this.el = el;
	}
}