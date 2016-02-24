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

      // if(Math.abs(relativeY) > 90 && this.max){
      //    this.afterIncreaseMaxCallback(relativeY, direction);
      //    return;
      // }

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

var _SlidesWrapper = require('./modules/SlidesWrapper.js');

var _SlidesWrapper2 = _interopRequireDefault(_SlidesWrapper);

var _ItemsContainer = require('./modules/ItemsContainer.js');

var _ItemsContainer2 = _interopRequireDefault(_ItemsContainer);

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
	this.itemsContainer.update(speed, direction);
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
			this.itemsContainer.enable();
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			console.log(this.bounceDeltaEmulator);
			this.bounceDeltaEmulator.disable();
			this.itemsContainer.disable();
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);
		this.slidesWrapper = new _SlidesWrapper2.default(this.settings, move);
		this.itemsContainer = new _ItemsContainer2.default(this.settings);
		this.bounceDeltaEmulator = new _AccelerateCounter2.default(window, onScroll.bind(this));

		this.setEnable.call(this);
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/AccelerateCounter.js":4,"./modules/ItemsContainer.js":6,"./modules/SlidesWrapper.js":7,"./utils/extend.js":8}],4:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;

var ACCELERATION = 1;
var MAX_SPEED = 120;
var WIND = 1.8;

var getCurrentState = function getCurrentState() {

   var speedAbs = Math.abs(this.currSpeed);

   // console.log(this.currSpeed);

   if (this.scrolling && speedAbs < MAX_SPEED) {
      return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
   }

   // if( this.scrolling && (speedAbs > (MAX_SPEED - 3)) ){
   //    return this.direction === 'UP' ? 'MAX_UP' : 'MAX_DOWN';
   // }

   // console.log(speedAbs);

   if (!this.scrolling && this.direction === 'DOWN' && this.currSpeed > 0) {
      return 'MOVE_BACK_UP';
   }

   if (!this.scrolling && this.direction === 'UP' && this.currSpeed < 0) {
      return 'MOVE_BACK_DOWN';
   }

   return 'IDLE';
};

var calcSpeed = function calcSpeed(state) {

   // console.log(state);
   this.acceleration = ACCELERATION * Math.abs(this.currentDelta);

   switch (state) {
      case 'SCROLLING_UP':
         this.currSpeed = this.currSpeed + this.acceleration;break;
      case 'SCROLLING_DOWN':
         this.currSpeed = this.currSpeed - this.acceleration;break;
      case 'MOVE_BACK_UP':
         this.currSpeed = this.currSpeed - WIND;break;
      case 'MOVE_BACK_DOWN':
         this.currSpeed = this.currSpeed + WIND;break;
      case 'SCROLLING_MAX_UP':
         this.currSpeed = MAX_SPEED;break;
      case 'SCROLLING_MAX_DOWN':
         this.currSpeed = -MAX_SPEED;break;
   }
};

var tick = function tick() {
   if (!this.active) {
      return;
   }

   var state = getCurrentState.call(this);

   calcSpeed.call(this, state);

   // if(state !== 'IDLE'){
   this.callback(this.currSpeed, this.direction);
   // }

   window.requestAnimationFrame(tick.bind(this));
};

var setNotScrolling = function setNotScrolling() {
   this.scrolling = false;
   this.direction = this.currSpeed > 0 ? 'DOWN' : 'UP';
};

var onScroll = function onScroll(event, delta) {
   this.scrolling = true;
   this.direction = delta > 0 ? 'UP' : 'DOWN';
   this.currentDelta = delta;

   if (this.currentDelta > 100) {
      this.currentDelta = this.currentDelta / 1000;
   } else if (this.currentDelta > 100) {
      this.currentDelta = this.currentDelta / 100;
   } else if (this.currentDelta > 10) {
      this.currentDelta = this.currentDelta / 10;
   }

   console.log(this.currentDelta);

   clearTimeout(timer);
   timer = setTimeout(setNotScrolling.bind(this), 140);
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

// import AnimationManager from './../animations/AnimationManager.js';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParallaxAnimation = require('./../animations/ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  _createClass(_class, [{
    key: 'enable',
    value: function enable() {
      console.log('enable item');
      this.ParallaxAnimationInst.enable();
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.ParallaxAnimationInst.disable();
    }
  }]);

  function _class(el, bounce) {
    _classCallCheck(this, _class);

    this.el = el;
    this.bounce = bounce;
    this.ParallaxAnimationInst = new _ParallaxAnimation2.default(el, bounce, function () {});
  }

  _createClass(_class, [{
    key: 'update',
    value: function update(speed, direction) {
      this.ParallaxAnimationInst.update(speed, direction);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./../animations/ParallaxAnimation.js":2}],6:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item = require('./Item.js');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseItem = function parseItem(el) {
  var bounce = parseFloat(el.dataset.parallaxBounce);
  this.items.push(new _Item2.default(el, bounce));
};

var getItems = function getItems() {
  var items = this.config.wrapper.querySelectorAll('[data-parallax-bounce]');
  Array.prototype.forEach.call(items, parseItem.bind(this));
};

var _class = function () {
  _createClass(_class, [{
    key: 'enable',
    value: function enable() {
      this.items.forEach(function (item) {
        return item.enable();
      });
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.items.forEach(function (item) {
        return item.disable();
      });
    }
  }]);

  function _class(config) {
    _classCallCheck(this, _class);

    this.config = config;
    this.items = [];
    getItems.call(this);
  }

  _createClass(_class, [{
    key: 'update',
    value: function update(delta, direction) {
      this.items.forEach(function (item) {
        return item.update(delta, direction);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./Item.js":5}],7:[function(require,module,exports){
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

var detectSlideChange = function detectSlideChange(speed, direction) {
	var func = direction === 'UP' ? this.moveDown : this.moveUp;
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
		value: function update(speed, direction) {
			this.ParallaxAnimationInst.update(speed, direction);
		}
	}]);

	return _class;
}();

exports.default = _class;

},{"./../animations/AnimationManager.js":1,"./../animations/ParallaxAnimation.js":2}],8:[function(require,module,exports){
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
