
'use strict';

var getComputedTranslateY = function(obj){
    if(!window.getComputedStyle) {
      return;
    }

    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
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

  animateTo(offsetTo, time, afterCallback, offsetFrom = getComputedTranslateY(this.el)){

  	if(this.isAnimation()){
  		return;
  	}

  	// if(this.player){
  	// 	this.player.pause();
  	// }
    
  	this.player = this.el.animate([
        {transform: `translate3d(0, ${offsetFrom}px, 0)`},
        {transform: `translate3d(0, ${offsetTo}px, 0)`}
    ],{
    	direction: 'alternate',
    	easing: 'ease-in-out',
        duration: time,
        fill: 'forwards'
    });

    this.player.addEventListener('finish', function(){
    	this.animation = false;
    	this.player = false;
    	afterCallback(offsetTo);
    }.bind(this));

	console.log(`Start Animation From ${offsetFrom} to ${offsetTo} int time ${time}ms`);

	this.animation = true;
  }

}
