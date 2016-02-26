
'use strict';

import ScrollManager from './ScrollManager.js';

export default class {


	detectScroll(delta, direction){
		// console.log('scroll');
		console.log(`Scroll event ${delta} ${direction}`);
	}

	constructor(){
		var scrollManagerInst = new ScrollManager(window, this.detectScroll.bind(this));
	}

}