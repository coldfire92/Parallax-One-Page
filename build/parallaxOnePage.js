(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StateController = require('./modules/StateController.js');

var _StateController2 = _interopRequireDefault(_StateController);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	bounceWrapper: 2.14,
	maxParralaxWrapper: 70
};

var slide = function slide(beforeSlide, nextSlide) {
	console.log('Move ' + beforeSlide + ' to' + nextSlide);
};

var parallaxOnePage = function () {
	_createClass(parallaxOnePage, [{
		key: 'moveDown',
		value: function moveDown() {}
	}, {
		key: 'moveTo',
		value: function moveTo() {}
	}, {
		key: 'toggleEnable',
		value: function toggleEnable() {
			if (this.enable) {
				this.setDisable();
			} else {
				this.setEnable();
			}
		}
	}, {
		key: 'setEnable',
		value: function setEnable() {
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);

		new _StateController2.default();

		slide.call(this, 1, 1);

		this.setEnable.call(this);
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/StateController.js":3,"./utils/extend.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_SCROLL_EVENT_TIME = 300;
var AGAIN_LISTEN_FOR_EVENTS = 50;
var MAX_DELTA_AS_SLOW_SCROLL = 15;

var firstEventTime = false,
    currentEventDirection = false,
    currentEventMaxDelta = 0,
    timerClearEventTime;

var clearEventTime = function clearEventTime() {
	console.log('clear curretn scroll');
	firstEventTime = false;
	currentEventDirection = '';
	currentEventMaxDelta = 0;
};

var calcCorrectDelta = function calcCorrectDelta(delta) {
	var absDelta = Math.abs(delta);

	if (absDelta > 100) {
		delta = currentEventDirection === 'up' ? 100 : -100;
	}

	return delta;
};

// repair for magic scroll on mac (chrome, safari)
var isCallEvent = function isCallEvent(event, delta, deltaX, deltaY) {
	if (!firstEventTime) {
		firstEventTime = Date.now();
		currentEventDirection = deltaY > 0 ? 'up' : 'down';
	}

	var currTime = Date.now(),
	    absDelta = Math.abs(deltaY),
	    diff = currTime - firstEventTime,
	    callEvent = diff < MAX_SCROLL_EVENT_TIME,
	    slowScroll = Math.abs(deltaY) < MAX_DELTA_AS_SLOW_SCROLL;

	if (absDelta > currentEventMaxDelta) {
		currentEventMaxDelta = absDelta;
	}

	clearTimeout(timerClearEventTime);
	timerClearEventTime = setTimeout(clearEventTime, AGAIN_LISTEN_FOR_EVENTS);

	if (slowScroll && currentEventMaxDelta < MAX_DELTA_AS_SLOW_SCROLL) {
		return true;
	}

	return callEvent;
};

var onScroll = function onScroll(event, delta, deltaX, deltaY) {
	if (isCallEvent(event, delta, deltaX, deltaY)) {
		this.onScrollFunction(calcCorrectDelta(deltaY, currentEventDirection), currentEventDirection);
	}
};

var _class = function _class(el, onScrollFunction) {
	_classCallCheck(this, _class);

	this.el = el;
	this.onScrollFunction = onScrollFunction;
	Hamster(this.el).wheel(onScroll.bind(this));
};

exports.default = _class;

},{}],3:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ScrollManager = require('./ScrollManager.js');

var _ScrollManager2 = _interopRequireDefault(_ScrollManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	_createClass(_class, [{
		key: 'detectScroll',
		value: function detectScroll(delta, direction) {
			// console.log('scroll');
			console.log('Scroll event ' + delta + ' ' + direction);
		}
	}]);

	function _class() {
		_classCallCheck(this, _class);

		var scrollManagerInst = new _ScrollManager2.default(window, this.detectScroll.bind(this));
	}

	return _class;
}();

exports.default = _class;

},{"./ScrollManager.js":2}],4:[function(require,module,exports){
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
