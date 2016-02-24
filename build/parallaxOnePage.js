(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slidesWrapper = require('./modules/slidesWrapper.js');

var _slidesWrapper2 = _interopRequireDefault(_slidesWrapper);

var _itemsContainer = require('./modules/itemsContainer.js');

var _itemsContainer2 = _interopRequireDefault(_itemsContainer);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DELTA = 1;

var animateDelta = function animateDelta() {};

var defaults = {
	var2: 'aaa',
	var3: 'sss'
};

var onScroll = function onScroll(event) {
	var delta = 0;

	if (event.wheelDelta) {
		// IE and Opera
		delta = event.wheelDelta / 10;
	} else if (event.detail) {
		// W3C
		delta = -event.detail / 2;
	}

	if (Math.abs(delta) < 2) {
		delta = delta * 10;
	}

	// var delta = e.wheelDelta || -e.deltaY || -e.detail;

	console.log(delta);

	this.slidesWrapper.changeDelta(delta);

	// this.itemsContainer.animate(delta);
};

var addEvents = function addEvents() {

	window.addEventListener('wheel', onScroll.bind(this), false);
	window.addEventListener('DOMMouseScroll', onScroll.bind(this), false);
};

var removeEvents = function removeEvents() {
	window.removeEventListener('wheel', onScroll.bind(this), false);
	window.removeEventListener('DOMMouseScroll', onScroll.bind(this), false);
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
			addEvents.call(this);
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			removeEvents.call(this);
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);
		this.slidesWrapper = new _slidesWrapper2.default(this.settings, move);
		this.itemsContainer = new _itemsContainer2.default(this.settings);

		this.setEnable();
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/itemsContainer.js":4,"./modules/slidesWrapper.js":5,"./utils/extend.js":6}],2:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PERIOD = 800;
var DIRECTION_SIGNS = {
	'down': {
		'sign': '-',
		'condition': '>=',
		'afterValue': 'this.offsetTo'
	},
	'up': {
		'sign': '+',
		'condition': '<=',
		'afterValue': 'this.offsetTo'
	}
};

var setTranslate = function setTranslate(y) {
	this.el.style.transform = 'translate3d(0px, ' + y + 'px,0px)';
};

var getAnimationDirection = function getAnimationDirection(from, to) {
	return to > from ? 'up' : 'down';
};

var animate = function animate() {
	var _this = this;

	var isEndAnimations;
	eval('isEndAnimations = ( Math.abs(this.currTrans) ' + this.directionProperties.condition + ' Math.abs(this.offsetTo) );');

	// console.log(this.currTrans + this.directionProperties.condition + this.offsetTo);

	if (isEndAnimations || this.currTrans > 0) {
		setTimeout(function () {
			return _this.animation = false;
		}, PERIOD);
		eval('this.currTrans = ' + this.directionProperties.afterValue + ';');
		setTranslate.call(this, this.currTrans);
		this.afterCallback(this.currTrans);
		return;
	}

	eval('this.currTrans ' + this.directionProperties.sign + '= this.step;');

	// console.log(this.currTrans);

	setTranslate.call(this, this.currTrans);
	window.requestAnimationFrame(animate.bind(this));
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
		value: function animateTo(offsetFrom, offsetTo, step, afterCallback) {

			if (this.isAnimation()) {
				return;
			}

			// direction
			this.direction = getAnimationDirection(offsetFrom, offsetTo);
			this.directionProperties = DIRECTION_SIGNS[this.direction];

			this.offsetTo = parseInt(offsetTo);
			this.offsetFrom = parseInt(offsetFrom);
			this.currTrans = parseInt(offsetFrom);
			this.step = parseFloat(step);
			this.afterCallback = afterCallback;

			setTranslate.call(this, offsetFrom);

			console.log('Start Animation From ' + offsetFrom + ' to ' + offsetTo + ' with step ' + step + ' with direction ' + this.direction);

			this.animation = true;
			animate.call(this);
		}
	}]);

	return _class;
}();

exports.default = _class;

},{}],3:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PARALLAX = 8.14;
var MAX_CONTORTION = 50;

var setTransform = function setTransform() {
  this.currentOffset = this.transYGlobal + this.transYRelative;
  this.el.style.transform = 'translate3d(0px, ' + this.currentOffset + 'px,0px)';
};

var animate = function animate() {
  this.transYRelative = this.currentDelta * PARALLAX;

  if (Math.abs(this.transYRelative) > MAX_CONTORTION) {
    this.afterIncreaseMaxCallback(this.transYRelative);
    this.transYRelative = 0;
    this.loopActive = false;
    return;
  }

  setTransform.call(this);

  window.requestAnimationFrame(animate.bind(this));
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
  }]);

  function _class(el, afterIncreaseMaxCallback) {
    _classCallCheck(this, _class);

    this.el = el;
    this.active = true;
    this.loopActive = false;

    // count params
    this.transYGlobal = 0;
    this.transYRelative = 0;
    this.currentDelta = 0;
    this.currentOffset = 0;

    this.afterIncreaseMaxCallback = afterIncreaseMaxCallback;
  }

  _createClass(_class, [{
    key: 'changeDelta',
    value: function changeDelta(delta) {
      if (!this.active) {
        return;
      }

      this.currentDelta = delta;
      if (!this.loopActive) {
        this.loopActive = true;
        animate.call(this);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(config) {
    _classCallCheck(this, _class);

    this.config = config;
  }

  _createClass(_class, [{
    key: 'animate',
    value: function animate(delta) {
      console.log('Animate items :' + delta);
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnimationManager = require('./AnimationManager.js');

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _ParallaxAnimation = require('./ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var detectSlideChange = function detectSlideChange(relativeDelta) {
	var func = relativeDelta < 0 ? this.moveDown : this.moveUp;
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

			this.BeetweenSlidesAnimationInst.animateTo(this.ParallaxAnimationInst.getCurrentOffset(), newOffset, 19.234, afterMove.bind(this));
		}
	}]);

	function _class(config, moveCollback) {
		_classCallCheck(this, _class);

		this.config = config;
		this.BeetweenSlidesAnimationInst = new _AnimationManager2.default(config.wrapper);
		this.ParallaxAnimationInst = new _ParallaxAnimation2.default(config.wrapper, detectSlideChange.bind(this));

		this.currentMouseDelta = 0;

		// Slide Animation
		this.currentPage = 1;
		this.pagesCount = 4;
		this.moveCollback = moveCollback;
	}

	_createClass(_class, [{
		key: 'changeDelta',
		value: function changeDelta(delta) {

			// console.log(delta);

			if (!this.BeetweenSlidesAnimationInst.isAnimation()) {
				this.ParallaxAnimationInst.changeDelta(delta);
			}
		}
	}]);

	return _class;
}();

exports.default = _class;

},{"./AnimationManager.js":2,"./ParallaxAnimation.js":3}],6:[function(require,module,exports){
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
