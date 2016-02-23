
import {Item} from "./modules/Item.js";
import {slidesContainer} from "./modules/slidesContainer.js";

class parallaxOnePage {
  
	constructor(config){
	 	this.config = config;
	 	this.slidesContainer = new slidesContainer();
	 	this.items = [];
	 	this.items.push( new Item() );
	}
}
