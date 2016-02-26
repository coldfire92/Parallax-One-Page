'use strict';

var getSectionsName = function(sections){
	Array.prototype.forEach.call(sections, function(section, index){
		var name = section.dataset.name;
		this.sectionsNames.push( name ? name : index + 1);
	}.bind(this));
};

var currentSectionName = '';

export default class {

	getNameOfSection(index){
		return this.sectionsNames[index-1];
	}

	beforeSlide(beforeSlide, currentSlide){
		// remove before slide classes
		document.body.classList.remove(currentSectionName);
		document.body.classList.remove('start-' + currentSectionName);
		document.body.classList.remove('before-' + currentSectionName);

		currentSectionName = this.getNameOfSection(currentSlide);

		document.body.classList.add('start-' + currentSectionName);
	}

	afterSlide(){
		document.body.classList.add(currentSectionName);
	}

	startShowItemsAnimation(){
		document.body.classList.add('before-' + currentSectionName);
	}

	constructor(config){
		this.sectionsNames = [];
		this.config = config;
		getSectionsName.call(this, this.config.sections);
		currentSectionName = this.getNameOfSection(1);

		// add classes after load
		this.beforeSlide(1,1);
		this.afterSlide(1,1);
		this.startShowItemsAnimation(1,1);
	}
}