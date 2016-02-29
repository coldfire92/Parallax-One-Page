
'use strict';

import Item from './Item.js';

var parseItem = function(el, sectionIndex){
  var configItem = {
      bounce : parseFloat(el.dataset.parallaxBounce),
      showingDisable : el.dataset.animationShowingDisable ? true : false,
      showingDelay : el.dataset.showingDelay ? parseInt(el.dataset.showingDelay) : 5
  };

	this.items.push( new Item(el, this.config, configItem, sectionIndex) );
};

var getItems = function(){
	var sections = this.config.sections;
  var self = this;
	Array.prototype.forEach.call(sections, (section, index)=>{
      var items = section.querySelectorAll('[data-parallax-bounce]');
      Array.prototype.forEach.call(items, (el)=>{
          parseItem.call(self, el, index+1);
      });
  });
};

export default class {
  
  updateDom(sections, currentSection){
      this.config.sections = sections;
      this.items = [];
      getItems.call(this);
      this.slide(0, currentSection); // run show items animation
  }

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

   show(from, to){
      this.items.forEach((item) => item.show(from, to));
   }

   hide(from, to){
      this.items.forEach((item) => item.hide(from, to));
   }

}