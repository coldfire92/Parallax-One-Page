
'use strict';

var onScroll = function(event){
	var delta = 0;

	if (event.wheelDelta) {
        // IE and Opera
        delta = event.wheelDelta / 10; 
    } else if (event.detail) {
        // W3C
        delta = -event.detail / 2;
    }

    if(Math.abs(delta) < 2){
		delta = delta * 10;
	} 

	console.log(delta);
	this.callback(delta);
};

export default class {


	disable(){
		this.el.removeEventListener('wheel', onScroll.bind(this), false);
		this.el.removeEventListener('DOMMouseScroll', onScroll.bind(this), false);	
	}

	enable(){
		this.el.addEventListener('wheel', onScroll.bind(this), false);
		this.el.addEventListener('DOMMouseScroll', onScroll.bind(this), false);	
	}
  
    constructor(el, callback){
  	   this.el = el;
  	   this.callback = callback;
   }
}
