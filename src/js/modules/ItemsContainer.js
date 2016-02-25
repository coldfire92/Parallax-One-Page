
'use strict';

import Item from './Item.js';

var parseItem = function(el, sectionIndex){
	var bounce = parseFloat(el.dataset.parallaxBounce);
	this.items.push( new Item(el, bounce, sectionIndex) );
};

var getItems = function(){
	var sections = this.config.wrapper.querySelectorAll('section');
  var self = this;
	Array.prototype.forEach.call(sections, (section, index)=>{
      var items = section.querySelectorAll('[data-parallax-bounce]');
      Array.prototype.forEach.call(items, (el)=>{
          parseItem.call(self, el, index+1);
      });
  });
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

   slide(from, to){
      this.items.forEach((item) => item.slide(from, to));
   }

}