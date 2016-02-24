
'use strict';

const PERIOD = 800;
const DIRECTION_SIGNS = {
	'down' : {
		'sign' : '-',
		'condition' : '>=',
		'afterValue' : 'this.offsetTo'
	},
	'up' : {
		'sign' : '+',
		'condition' : '<=',
		'afterValue' : 'this.offsetTo'
	}
};

var setTranslate = function(y){
	this.el.style.transform = 'translate3d(0px, ' + y + 'px,0px)';
};

var getAnimationDirection = function(from, to){
	return (to > from) ? 'up' : 'down';
};

var animate = function(){
	var isEndAnimations;
	eval(`isEndAnimations = ( Math.abs(this.currTrans) ${this.directionProperties.condition} Math.abs(this.offsetTo) );`);

	// console.log(this.currTrans + this.directionProperties.condition + this.offsetTo);

	if(isEndAnimations || this.currTrans > 0){
		setTimeout(() => this.animation = false, PERIOD);
		eval(`this.currTrans = ${this.directionProperties.afterValue};`);
		setTranslate.call(this,this.currTrans);
		this.afterCallback(this.currTrans);
		return;
	}

	eval(`this.currTrans ${this.directionProperties.sign}= this.step;`);

	// console.log(this.currTrans);
	
	setTranslate.call(this, this.currTrans);
	window.requestAnimationFrame(animate.bind(this));
};

export default class {
  
  constructor(el){
  	 this.animation = false;
  	 this.currTrans = 0;
 	 this.el = el;
  }

  isAnimation(){
  	return this.animation;
  }

  animateTo(offsetFrom, offsetTo, step, afterCallback){

  	if(this.isAnimation()){
  		return;
  	}

  	// direction
  	this.direction = getAnimationDirection(offsetFrom, offsetTo);
  	this.directionProperties = DIRECTION_SIGNS[this.direction];

  	this.offsetTo = parseInt(offsetTo);
  	this.offsetFrom = parseInt(offsetFrom);
  	this.currTrans = parseInt(offsetFrom);
  	this.step = parseFloat(step);
  	this.afterCallback = afterCallback;

  	setTranslate.call(this, offsetFrom);

	console.log(`Start Animation From ${offsetFrom} to ${offsetTo} with step ${step} with direction ${this.direction}`);

	this.animation = true;
	animate.call(this);
  }

}
