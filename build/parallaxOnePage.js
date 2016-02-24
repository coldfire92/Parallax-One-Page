(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

// import SlidesWrapper from './modules/SlidesWrapper.js';
// import ItemsContainer from './modules/ItemsContainer.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BounceDeltaEmulator = require('./modules/BounceDeltaEmulator.js');

var _BounceDeltaEmulator2 = _interopRequireDefault(_BounceDeltaEmulator);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	bounceWrapper: 20.14,
	maxParralaxWrapper: 100,
	slideAnimationTime: 900
};

var onScroll = function onScroll(delta) {
	console.log(delta);
	// this.slidesWrapper.changeDelta(delta);
	// this.itemsContainer.changeDelta(delta);
};

var move = function move(beforeSlide, nextSlide) {
	console.log('Move ' + beforeSlide + ' after' + nextSlide);
};

var parallaxOnePage = function () {
	_createClass(parallaxOnePage, [{
		key: 'moveDown',
		value: function moveDown() {}
	}, {
		key: 'moveTo',
		value: function moveTo() {}
	}, {
		key: 'setEnable',
		value: function setEnable() {
			this.bounceDeltaEmulator.enable();
			// this.itemsContainer.enable();
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			this.bounceDeltaEmulator.disable();
			// this.itemsContainer.disable();
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);
		// this.slidesWrapper = new SlidesWrapper(this.settings, move);
		// this.itemsContainer = new ItemsContainer(this.settings);
		this.bounceDeltaEmulator = new _BounceDeltaEmulator2.default(window, onScroll.bind(this));

		this.setEnable();
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/BounceDeltaEmulator.js":2,"./utils/extend.js":3}],2:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;
var currentDelta = 0;
var lastStateDelta = 0;
var returnAnimation = false;

var startReturnAnimation = function startReturnAnimation() {
	returnAnimation = true;
};

var calcReturnDelta = function calcReturnDelta() {
	var calcDelta = Math.floor(currentDelta) * 10;
	this.callback(calcDelta);
};

var animateBounce = function animateBounce() {

	if (startReturnAnimation) {

		if (currentDelta > 0) {
			currentDelta -= 0.12;
		} else {
			currentDelta += 0.12;
		}

		if (Math.abs(currentDelta) < 0.5) {
			currentDelta = 0;
			returnAnimation = false;
		}
	}

	calcReturnDelta.call(this);

	window.requestAnimationFrame(animateBounce.bind(this));
};

var onScroll = function onScroll(event, delta, deltaX, deltaY) {
	// console.log(`Delta: ${delta}; DeltaY: ${deltaY}`);

	if (Math.abs(delta) > 50 && Math.abs(delta) < 100) {
		delta /= 10;
	};

	if (Math.abs(delta) >= 100) {
		delta /= 100;
	};

	currentDelta = delta;

	clearTimeout(timer);
	timer = setTimeout(startReturnAnimation, 120);
};

var _class = function () {
	_createClass(_class, [{
		key: 'disable',
		value: function disable() {
			Hamster(this.el).unwheel(onScroll.bind(this));
		}
	}, {
		key: 'enable',
		value: function enable() {
			Hamster(this.el).wheel(onScroll.bind(this));
		}
	}]);

	function _class(el, callback) {
		_classCallCheck(this, _class);

		this.el = el;
		this.callback = callback;
		animateBounce.call(this);
	}

	return _class;
}();

exports.default = _class;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (obj1, obj2) {
   for (var i in obj2) {
      if (obj2.hasOwnProperty(i)) {
         obj1[i] = obj2[i];
      }
   }
   return obj1;
};

},{}]},{},[1])


//# sourceMappingURL=parallaxOnePage.js.map
