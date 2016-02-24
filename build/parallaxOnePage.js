(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getComputedTranslateY = function getComputedTranslateY(obj) {
    if (!window.getComputedStyle) {
        return;
    }

    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
};

var _class = function () {
    function _class(el) {
        _classCallCheck(this, _class);

        this.animation = false;
        this.currTrans = 0;
        this.el = el;
    }

    _createClass(_class, [{
        key: 'isAnimation',
        value: function isAnimation() {
            return this.animation;
        }
    }, {
        key: 'animateTo',
        value: function animateTo(offsetTo, time, afterCallback) {
            var offsetFrom = arguments.length <= 3 || arguments[3] === undefined ? getComputedTranslateY(this.el) : arguments[3];


            if (this.isAnimation()) {
                return;
            }

            // if(this.player){
            // 	this.player.pause();
            // }

            this.player = this.el.animate([{ transform: 'translate3d(0, ' + offsetFrom + 'px, 0)' }, { transform: 'translate3d(0, ' + offsetTo + 'px, 0)' }], {
                direction: 'alternate',
                easing: 'ease-in-out',
                duration: time,
                fill: 'forwards'
            });

            this.player.addEventListener('finish', function () {
                this.animation = false;
                this.player = false;
                afterCallback(offsetTo);
            }.bind(this));

            console.log('Start Animation From ' + offsetFrom + ' to ' + offsetTo + ' int time ' + time + 'ms');

            this.animation = true;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnimationManager = require('./AnimationManager.js');

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setNewDelta = function setNewDelta(delta) {

  // if( Math.abs(this.currentDelta) <= Math.abs(delta) ){
  this.currentDelta = delta;
  // }

  // console.log(`Current delta: ${delta}, delta saved for animation ${this.currentDelta}`);
};

var _class = function () {
  _createClass(_class, [{
    key: 'changeGlobalTranslate',
    value: function changeGlobalTranslate(offset) {
      this.transYGlobal = offset;
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
    this.loopActive = false;
    this.bounce = bounce;

    this.timerStartAnimation = null;
    this.timerCallSlideChange = null;

    // instances
    this.Animation = new _AnimationManager2.default(this.el);

    // count params
    this.transYGlobal = 0;
    this.transYRelative = 0;
    this.currentDelta = 0;
    this.currentOffset = 0;

    // after increase
    this.afterIncreaseMaxCallback = false;
    this.max = false;
    this.detectNextSlideMove = false;
  }

  _createClass(_class, [{
    key: 'update',
    value: function update(speed, direction) {

      if (!this.active) {
        return;
      }

      var relativeY = Math.floor(speed * this.bounce, 2);

      console.log(direction);

      if (Math.abs(relativeY) > 90 && this.max) {
        this.afterIncreaseMaxCallback(relativeY, direction);
        return;
      }

      var y = relativeY + this.transYGlobal;

      this.el.style.transform = 'translate(0px, ' + y + 'px)';

      // startAnimation.call(this);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./AnimationManager.js":1}],3:[function(require,module,exports){

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import ItemsContainer from './modules/ItemsContainer.js';


var _SlidesWrapper = require('./modules/SlidesWrapper.js');

var _SlidesWrapper2 = _interopRequireDefault(_SlidesWrapper);

var _AccelerateCounter = require('./modules/AccelerateCounter.js');

var _AccelerateCounter2 = _interopRequireDefault(_AccelerateCounter);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	bounceWrapper: 2.14,
	maxParralaxWrapper: 100,
	slideAnimationTime: 900
};

var onScroll = function onScroll(speed, direction) {
	// console.log(accelerate);
	this.slidesWrapper.update(speed, direction);
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
			this.bounceDeltaEmulator.enable();
			// this.itemsContainer.enable();
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			console.log(this.bounceDeltaEmulator);
			this.bounceDeltaEmulator.disable();
			// this.itemsContainer.disable();
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);
		this.slidesWrapper = new _SlidesWrapper2.default(this.settings, move);
		// this.itemsContainer = new ItemsContainer(this.settings);
		this.bounceDeltaEmulator = new _AccelerateCounter2.default(window, onScroll.bind(this));

		this.setEnable.call(this);
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/AccelerateCounter.js":4,"./modules/SlidesWrapper.js":5,"./utils/extend.js":6}],4:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;

var ACCELERATION = 1;
var MAX_SPEED = 40;
var WIND = 0.8;

var calcSpeed = function calcSpeed() {
  var state;

  var SpeedAbs = Math.abs(this.currSpeed);

  var acceleration = ACCELERATION * Math.abs(this.currentDelta);

  if (Math.abs(this.currSpeed) < 0.2) {
    this.currSpeed = 0;
  }

  if (this.scrolling && Math.abs(this.currSpeed) < MAX_SPEED) {
    state = 'accelerating';
    if (this.direction === 'up') {
      this.currSpeed = this.currSpeed + acceleration;
    } else {
      this.currSpeed = this.currSpeed - acceleration;
    }
  } else if (Math.abs(this.currSpeed) > 0.2) {
    state = 'move back';

    if (Math.abs(this.currSpeed) < 0.6) {
      this.currSpeed = 0;
    }

    this.direction = this.currSpeed > 0 ? 'down' : 'up';
    if (this.direction === 'up') {
      this.currSpeed = this.currSpeed + WIND;
    } else {
      this.currSpeed = this.currSpeed - WIND;
    }
  } else {
    state = 'idle';
    this.currSpeed = 0;
  }

  // console.log(`Statee : ${state}; Directon ${this.direction}; Speed: ${this.currSpeed}; SpeedAbs: ${SpeedAbs}`);
};

var tick = function tick() {
  if (!this.active) {
    return;
  }

  var lastSpeed = this.currSpeed;
  calcSpeed.call(this);

  // if( (Math.abs(lastSpeed) - Math.abs(this.currSpeed)) < 0.5){
  // } else {
  // 	this.callback(this.currSpeed);	
  // }

  this.callback(this.currSpeed, this.direction);

  window.requestAnimationFrame(tick.bind(this));
};

var setNotScrolling = function setNotScrolling() {
  this.scrolling = false;
};

var onScroll = function onScroll(event, delta) {
  this.scrolling = true;
  this.direction = delta > 0 ? 'up' : 'down';
  this.currentDelta = delta;

  clearTimeout(timer);
  timer = setTimeout(setNotScrolling.bind(this), 100);
};

var _class = function () {
  _createClass(_class, [{
    key: 'disable',
    value: function disable() {
      this.active = false;
      // Hamster(this.el).unwheel(onScroll.bind(this));
    }
  }, {
    key: 'enable',
    value: function enable() {
      Hamster(this.el).wheel(onScroll.bind(this));
      this.active = true;
      tick.call(this);
    }
  }]);

  function _class(el, callback) {
    _classCallCheck(this, _class);

    this.el = el;
    this.callback = callback;
    this.scrolling = false;
    this.currSpeed = 0;
    this.direction = 'up';
    this.active = true;
  }

  return _class;
}();

exports.default = _class;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnimationManager = require('./../animations/AnimationManager.js');

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _ParallaxAnimation = require('./../animations/ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var detectSlideChange = function detectSlideChange(direction) {
	console.log(direction);

	var func = direction == 'up' ? this.moveDown : this.moveUp;
	func.call(this);
};

var afterMove = function afterMove(offset) {
	this.ParallaxAnimationInst.changeGlobalTranslate(offset);
	this.ParallaxAnimationInst.enable();
	console.log('after move');
};

var _class = function () {
	_createClass(_class, [{
		key: 'moveDown',
		value: function moveDown() {
			if (this.BeetweenSlidesAnimationInst.isAnimation()) {
				return false;
			}

			if (this.currentPage < this.pagesCount) {
				++this.currentPage;
				this.move();
				return true;
			}

			return false;
		}
	}, {
		key: 'moveUp',
		value: function moveUp() {
			if (this.BeetweenSlidesAnimationInst.isAnimation()) {
				return false;
			}

			if (this.currentPage !== 1) {
				--this.currentPage;
				this.move();
				return true;
			}

			return false;
		}
	}, {
		key: 'move',
		value: function move() {
			var id = arguments.length <= 0 || arguments[0] === undefined ? this.currentPage : arguments[0];

			console.log('Move to: ' + id);
			var newOffset = (id - 1) * window.innerHeight * -1;
			this.ParallaxAnimationInst.disable();

			console.log('disable');

			this.BeetweenSlidesAnimationInst.animateTo(newOffset, this.config.slideAnimationTime, afterMove.bind(this));
		}
	}]);

	function _class(config, moveCollback) {
		_classCallCheck(this, _class);

		this.config = config;

		this.BeetweenSlidesAnimationInst = new _AnimationManager2.default(config.wrapper);
		this.ParallaxAnimationInst = new _ParallaxAnimation2.default(config.wrapper, this.config.bounceWrapper);
		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
		this.currentMouseDelta = 0;

		// Slide Animation
		this.currentPage = 1;
		this.pagesCount = 4;
		this.moveCollback = moveCollback;
	}

	_createClass(_class, [{
		key: 'update',
		value: function update(delta, direction) {
			this.ParallaxAnimationInst.update(delta);
		}
	}]);

	return _class;
}();

exports.default = _class;

},{"./../animations/AnimationManager.js":1,"./../animations/ParallaxAnimation.js":2}],6:[function(require,module,exports){
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
