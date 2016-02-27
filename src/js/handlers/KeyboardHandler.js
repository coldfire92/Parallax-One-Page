
'use strict';

var onSpaceButtonFn = function(){},
	onArrowUpFn = function(){},
	onArrowDownFn = function(){};


const ARROW_UP = 38;
const ARROW_DOWN = 40;
const SPACEBAR = 32;


var handleKey = function(e){
	 var tag = e.target.tagName.toLowerCase();
	 if (tag === 'input' || tag === 'textarea') {
	 	return false;
	 }

     switch (e.which) {
     	case ARROW_UP: onArrowUpFn(); break;
     	case ARROW_DOWN: onArrowDownFn(); break;
     	case SPACEBAR: onSpaceButtonFn(); break;
     }
 };        

export default class {

	addSpaceAction(fn){
		onSpaceButtonFn = fn;
	}

	addArrowUpAction(fn){
		onArrowUpFn = fn;
	}

	addArrowDownAction(fn){
		onArrowDownFn = fn;
	}

	enable(){
		document.addEventListener('keyup', handleKey);
	}

	disable(){
		document.removeEventListener('keyup', handleKey);
	}

	constructor(){

	}
}
