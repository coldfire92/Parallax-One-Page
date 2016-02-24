
'use strict';

import Item from './Item.js';

var parseItem = function(el){
	var bounce = parseFloat(el.dataset.parallaxBounce);
	this.items.push( new Item(el, bounce) );
};

var getItems = function(){
	var items = this.config.wrapper.querySelectorAll('[data-parallax-bounce]');
	Array.prototype.forEach.call(items, parseItem.bind(this));
};

export default class {
  
   enable(){
      this.items.forEach((item) => item.enable());
   }

   disable(){
      this.items.forEach((item) => item.disable());
   }

   constructor(config){
  	  this.config = config;
  	  this.items = [];
  	  getItems.call(this);
   }

   update(delta, direction){
  	  this.items.forEach((item) => item.update(delta, direction));
   }

}