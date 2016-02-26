(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var easeIn = function easeIn(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
};

var seconds = 0.5;
var duration = 60 * seconds;

var animate = function animate() {
  this.beginOffset = this.currentOffset;
  this.changeOffset = this.finishOffset - this.beginOffset;
  this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
  this.el.style.transform = 'translateY(' + this.currentOffset + 'px)';
};

var _class = function () {
  _createClass(_class, [{
    key: 'changeGlobalTranslate',
    value: function changeGlobalTranslate(offset) {
      this.transYGlobal = offset;
      this.currentOffset = offset;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.active = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.active = true;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.currentOffset = 0;
      this.el.style.transform = '';
    }
  }, {
    key: 'getCurrentOffset',
    value: function getCurrentOffset() {
      return this.currentOffset;
    }
  }, {
    key: 'setMaxOffset',
    value: function setMaxOffset(afterIncreaseMaxCallback, max) {
      this.afterIncreaseMaxCallback = afterIncreaseMaxCallback;
      this.max = max;
    }
  }]);

  function _class(el, bounce) {
    _classCallCheck(this, _class);

    this.el = el;
    this.active = true;
    this.bounce = bounce;

    // count params
    this.transYGlobal = 0;
    this.currentOffset = 0;
    this.beginOffset = 0;
    this.finishOffset = 0;
    this.changeOffset = 0;

    // after increase
    this.afterIncreaseMaxCallback = false;
    this.max = false;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update(speed, direction) {
      if (!this.active) {
        return;
      }

      var relativeY = Math.round(speed * this.bounce * 100) / 100;
      this.finishOffset = relativeY + this.transYGlobal;

      if (this.afterIncreaseMaxCallback && this.max) {
        if (Math.abs(relativeY) > this.max) {
          this.afterIncreaseMaxCallback(relativeY, direction);
        }
      }

      animate.call(this);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_SCROLL_EVENT_TIME = 300;
var AGAIN_LISTEN_FOR_EVENTS = 50;
var MAX_DELTA_AS_SLOW_SCROLL = 15;
var MAX_ALLOWED_DELTA = 100;

var firstEventTime = false,
    currentEventDirection = false,
    currentEventMaxDelta = 0,
    timerClearEventTime;

var clearEventTime = function clearEventTime() {
	firstEventTime = false;
	currentEventDirection = '';
	currentEventMaxDelta = 0;
};

var calcCorrectDelta = function calcCorrectDelta(delta) {
	var absDelta = Math.abs(delta);

	if (absDelta > MAX_ALLOWED_DELTA) {
		// max delta
		delta = currentEventDirection === 'UP' ? MAX_ALLOWED_DELTA : -MAX_ALLOWED_DELTA;
	}

	return delta;
};

// repair for magic scroll on mac (chrome, safari)
var isCallEvent = function isCallEvent(event, delta, deltaX, deltaY) {
	if (!firstEventTime) {
		firstEventTime = Date.now();
		currentEventDirection = deltaY > 0 ? 'UP' : 'DOWN';
	}

	var currTime = Date.now(),
	    absDelta = Math.abs(deltaY),
	    diff = currTime - firstEventTime,
	    callEvent = diff < MAX_SCROLL_EVENT_TIME,
	    slowScroll = Math.abs(deltaY) < MAX_DELTA_AS_SLOW_SCROLL;

	// set max delta of current scroll
	if (absDelta > currentEventMaxDelta) {
		currentEventMaxDelta = absDelta;
	}

	// clear current scroll
	clearTimeout(timerClearEventTime);
	timerClearEventTime = setTimeout(clearEventTime, AGAIN_LISTEN_FOR_EVENTS);

	// for slow scrolls (touchapad or magic mouse)
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StateController = require('./modules/StateController.js');

var _StateController2 = _interopRequireDefault(_StateController);

var _SlidesWrapper = require('./modules/SlidesWrapper.js');

var _SlidesWrapper2 = _interopRequireDefault(_SlidesWrapper);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	bounceWrapper: 2.14,
	maxParralaxWrapper: 90,
	beforeSlide: function beforeSlide() {},
	afterSlide: function afterSlide() {},
	whenStartShowHideAnimation: function whenStartShowHideAnimation() {}
};

var parallaxOnePage = function () {
	_createClass(parallaxOnePage, [{
		key: 'slideUp',
		value: function slideUp() {
			this.slidesWrapperInst.moveUp();
		}
	}, {
		key: 'slideDown',
		value: function slideDown() {
			this.slidesWrapperInst.moveDown();
		}
	}, {
		key: 'slideTo',
		value: function slideTo(index) {
			this.slidesWrapperInst.moveTo(index);
		}
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
			this.stateControllerInst.enable();
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			this.stateControllerInst.disable();
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);

		this.slidesWrapperInst = new _SlidesWrapper2.default(this.settings);

		this.stateControllerInst = new _StateController2.default(this.settings);
		this.stateControllerInst.onTick(this.slidesWrapperInst.update.bind(this.slidesWrapperInst));

		this.slidesWrapperInst.beforeMove(this.stateControllerInst.resetSpeed.bind(this));

		this.setEnable.call(this);
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/SlidesWrapper.js":4,"./modules/StateController.js":5,"./utils/extend.js":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParallaxAnimation = require('./../animations/ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var seconds = 0.5;
var duration = 60 * seconds;

var easeIn = function easeIn(t, b, c, d) {
	return -c * (t /= d) * (t - 2) + b;
};

var blockedSlideDetect = false;
var detectSlideChange = function detectSlideChange(speed, direction) {
	if (blockedSlideDetect) {
		return;
	}

	blockedSlideDetect = true;
	setTimeout(function () {
		return blockedSlideDetect = false;
	}, 2500);
	var func = direction === 'UP' ? this.slideUp : this.slideDown;
	func.call(this);
};

var isFinish,
    beforeMoveCallback = function beforeMoveCallback() {};

var animateSlideChange = function animateSlideChange() {
	if (isFinish) {
		return;
	}

	var absCurrentOffset = Math.abs(this.currentOffset),
	    absFinish = Math.abs(this.finishOffset);

	if (this.state === 'SLIDE_DOWN') {
		isFinish = absCurrentOffset > absFinish - 1;
		this.beginOffset = this.currentOffset;
		this.changeOffset = this.finishOffset - this.beginOffset;
		// console.log(`Animate slide up from ${this.beginOffset} to ${this.finishOffset} with ${this.changeOffset} `);
		this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	} else {
		isFinish = absCurrentOffset < absFinish + 1;
		this.beginOffset = this.currentOffset;
		this.changeOffset = Math.abs(this.finishOffset - this.beginOffset);
		// console.log(`Animate slide up from ${this.beginOffset} to ${this.finishOffset} with ${this.changeOffset} `);
		this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	}

	if (isFinish) {
		this.ParallaxAnimationInst.changeGlobalTranslate(this.finishOffset);
		this.currentOffset = this.finishOffset;
		beforeMoveCallback();
		setTimeout(function () {
			isFinish = false;
			this.state = 'PARALLAX';
		}.bind(this), 200);
		return;
	}

	this.currentOffset = easeIn(1, this.beginOffset, this.changeOffset, duration);
	this.config.wrapper.style.transform = 'translateY(' + this.currentOffset + 'px)';
};

var _class = function () {
	_createClass(_class, [{
		key: 'beforeMove',
		value: function beforeMove(fn) {
			beforeMoveCallback = fn;
		}
	}, {
		key: 'slideDown',
		value: function slideDown() {
			if (this.currentPage < this.pagesCount) {
				++this.currentPage;
				this.finishOffset = (this.currentPage - 1) * window.innerHeight * -1;
				this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
				this.state = 'SLIDE_DOWN';
				beforeMoveCallback();
				return true;
			}

			return false;
		}
	}, {
		key: 'slideUp',
		value: function slideUp() {
			if (this.currentPage !== 1) {
				--this.currentPage;
				this.finishOffset = (this.currentPage - 1) * window.innerHeight * -1;
				this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();

				console.log(this.currentOffset + ' -> ' + this.finishOffset);

				this.state = 'SLIDE_UP';
				beforeMoveCallback();
				return true;
			}

			return false;
		}
	}, {
		key: 'slideTo',
		value: function slideTo() {
			var id = arguments.length <= 0 || arguments[0] === undefined ? this.currentPage : arguments[0];

			console.log('Move to: ' + id);
		}
	}]);

	function _class(config) {
		_classCallCheck(this, _class);

		this.config = config;
		this.ParallaxAnimationInst = new _ParallaxAnimation2.default(config.wrapper, this.config.bounceWrapper);
		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
		this.currentOffset = 0;

		// Slide Animation
		this.currentPage = 1;
		this.pagesCount = 4;

		this.state = 'PARALLAX';
	}

	_createClass(_class, [{
		key: 'update',
		value: function update(speed, direction) {
			if (this.state === 'PARALLAX') {
				this.ParallaxAnimationInst.update(speed, direction);
			} else {
				animateSlideChange.call(this);
			}
		}
	}]);

	return _class;
}();

exports.default = _class;

},{"./../animations/ParallaxAnimation.js":1}],5:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ScrollHandler = require('./../handlers/ScrollHandler.js');

var _ScrollHandler2 = _interopRequireDefault(_ScrollHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ACCELERATION = 1;
var MAX_SPEED = 80;
var WIND = 2.8;

var timer = null,
    currentSpeed = 0,
    speedAbs;

var tickFn = function tickFn() {};

var calcAccelerate = function calcAccelerate() {
  var acceleration = ACCELERATION * Math.abs(this.currentDelta);
  return acceleration / 2;
};

var getCurrentState = function getCurrentState() {

  speedAbs = Math.abs(currentSpeed);

  if (this.scrolling && speedAbs < MAX_SPEED) {
    return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
  }

  if (speedAbs < 1.6) {
    return 'CLOSE_ZERO';
  }

  if (!this.scrolling && currentSpeed < 0) {
    return 'MOVE_BACK_UP';
  }

  if (!this.scrolling && currentSpeed > 0) {
    return 'MOVE_BACK_DOWN';
  }

  if (speedAbs > MAX_SPEED - 5) {
    return this.direction === 'UP' ? 'SCROLLING_MAX_UP' : 'SCROLLING_MAX_DOWN';
  }

  return 'IDLE';
};

var calcSpeed = function calcSpeed(state) {
  this.acceleration = calcAccelerate.call(this);
  // console.log(state);

  switch (state) {
    case 'SCROLLING_UP':
      currentSpeed = currentSpeed + this.acceleration;break;
    case 'SCROLLING_DOWN':
      currentSpeed = currentSpeed - this.acceleration;break;
    case 'MOVE_BACK_UP':
      currentSpeed = currentSpeed + WIND;break;
    case 'MOVE_BACK_DOWN':
      currentSpeed = currentSpeed - WIND;break;
    case 'SCROLLING_MAX_UP':
      currentSpeed = MAX_SPEED;break;
    case 'SCROLLING_MAX_DOWN':
      currentSpeed = -MAX_SPEED;break;
    case 'CLOSE_ZERO':
      currentSpeed = 0;break;
  }
};

var setNotScrolling = function setNotScrolling() {
  this.scrolling = false;
};

var tick = function tick() {
  if (!this.active) {
    return;
  }

  var state = getCurrentState.call(this);
  // console.log(`State: ${state}, Scrolling: ${this.scrolling}, speed: ${currentSpeed}, direction: ${this.direction}`);

  calcSpeed.call(this, state);
  tickFn(currentSpeed, this.direction);
  // console.log(state);
  // console.log(currentSpeed);

  window.requestAnimationFrame(tick.bind(this));
};

var _class = function () {
  _createClass(_class, [{
    key: 'resetSpeed',
    value: function resetSpeed() {
      currentSpeed = 0;
      // console.log(currentSpeed);
      // console.log(`Reset speed`);
    }
  }, {
    key: 'detectScroll',
    value: function detectScroll(delta, direction) {
      // console.log(delta);
      this.scrolling = true;
      this.direction = direction;
      this.currentDelta = delta;
      clearTimeout(timer);
      timer = setTimeout(setNotScrolling.bind(this), 160);
    }
  }, {
    key: 'onTick',
    value: function onTick(fn) {
      tickFn = fn;
    }
  }]);

  function _class() {
    _classCallCheck(this, _class);

    this.scrolling = false;
    this.active = true;
    this.currentDelta = 0;
    this.scrollManagerInst = new _ScrollHandler2.default(window, this.detectScroll.bind(this));
  }

  _createClass(_class, [{
    key: 'disable',
    value: function disable() {
      this.active = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.active = true;
      tick.call(this);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./../handlers/ScrollHandler.js":2}],6:[function(require,module,exports){
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

},{}]},{},[3])


//# sourceMappingURL=parallaxOnePage.js.map
