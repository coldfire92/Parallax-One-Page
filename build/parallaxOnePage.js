(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

      if (this.afterIncreaseMaxCallback && this.max) {
        if (Math.abs(relativeY) > this.max) {
          this.afterIncreaseMaxCallback(relativeY, direction);
        }
      }
      if (this.currentOffset !== relativeY + this.transYGlobal) {
        this.currentOffset = relativeY + this.transYGlobal;
        this.el.style.transform = 'translateY(' + this.currentOffset + 'px)';
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

},{}],2:[function(require,module,exports){

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SlidesWrapper = require('./modules/SlidesWrapper.js');

var _SlidesWrapper2 = _interopRequireDefault(_SlidesWrapper);

var _ItemsContainer = require('./modules/ItemsContainer.js');

var _ItemsContainer2 = _interopRequireDefault(_ItemsContainer);

var _Ticker = require('./modules/Ticker.js');

var _Ticker2 = _interopRequireDefault(_Ticker);

var _extend = require('./utils/extend.js');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
	bounceWrapper: 2.14,
	maxParralaxWrapper: 70
};

var onScroll = function onScroll(speed, direction) {
	// console.log(accelerate);
	this.slidesWrapper.update(speed, direction);
	this.itemsContainer.update(speed, direction);
};

var slide = function slide(beforeSlide, nextSlide) {
	console.log('Move ' + beforeSlide + ' to' + nextSlide);
	this.itemsContainer.slide(beforeSlide, nextSlide);
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
			this.tickerInst.enable();
			this.itemsContainer.enable();
			this.enable = true;
		}
	}, {
		key: 'setDisable',
		value: function setDisable() {
			console.log(this.bounceDeltaEmulator);
			this.tickerInst.disable();
			this.itemsContainer.disable();
			this.enable = false;
		}
	}]);

	function parallaxOnePage(options) {
		_classCallCheck(this, parallaxOnePage);

		this.enable = true;
		this.settings = (0, _extend2.default)(defaults, options);
		this.slidesWrapper = new _SlidesWrapper2.default(this.settings, slide.bind(this));
		this.itemsContainer = new _ItemsContainer2.default(this.settings);
		this.tickerInst = new _Ticker2.default(window, onScroll.bind(this));

		slide.call(this, 1, 1);

		this.setEnable.call(this);
	}

	return parallaxOnePage;
}();

window.getParallaxOnePage = function (config) {
	return new parallaxOnePage(config);
};

},{"./modules/ItemsContainer.js":5,"./modules/SlidesWrapper.js":7,"./modules/Ticker.js":8,"./utils/extend.js":9}],3:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

String.prototype.strpos = function (str) {
    if (Array.isArray(str)) {
        for (var i = 0; i < str.length; i++) {
            if (this.indexOf(str[i]) > -1) {
                return true;
            }
        }

        return false;
    } else {
        return this.indexOf(str) != -1;
    }
};

var _this;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        _this = this;
        this.agent = navigator.userAgent.toLowerCase();
        this.prefix = this.getPrefix();
        this.detectMobile();
        this.detectBrowser();
        this.detectSystem();
    }

    _createClass(_class, [{
        key: 'getPrefix',
        value: function getPrefix() {
            var pre = '',
                dom;

            if (!window._NODE_) {
                var styles = window.getComputedStyle(document.documentElement, '');
                pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
                dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];
            } else {
                pre = 'webkit';
            }

            var IE = _this.detect('trident');

            return {
                unprefixed: IE && !_this.detect('msie 9'),
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: (IE ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
            };
        }
    }, {
        key: 'detect',
        value: function detect(array) {
            if (typeof array === 'string') {
                array = [array];
            }
            for (var i = 0; i < array.length; i++) {
                if (this.agent.strpos(array[i])) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'checkForTag',
        value: function checkForTag(prop) {
            var div = _tagDiv || document.createElement('div'),
                vendors = 'Khtml ms O Moz Webkit'.split(' '),
                len = vendors.length;

            _tagDiv = div;

            if (prop in div.style) return true;
            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });

            while (len--) {
                if (vendors[len] + prop in div.style) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'detectMobile',
        value: function detectMobile() {
            this.mobile = !window._NODE_ && !!('ontouchstart' in window || 'onpointerdown' in window) && this.detect(['ios', 'iphone', 'ipad', 'windows', 'android', 'blackberry']) ? {} : false;
            if (this.mobile && this.detect('windows') && !this.detect('touch')) this.mobile = false;
            if (this.mobile) {
                this.mobile.tablet = Math.max(screen.width, screen.height) > 800;
                this.mobile.phone = !this.mobile.tablet;
            }
        }
    }, {
        key: 'detectBrowser',
        value: function detectBrowser() {
            this.browser = {};
            this.browser.ie = function () {
                if (_this.detect('msie')) return true;
                if (_this.detect('trident') && _this.detect('rv:')) return true;
                if (_this.detect('windows') && _this.detect('edge')) return true;
            }();
            this.browser.chrome = !this.browser.ie && this.detect('chrome');
            this.browser.safari = !this.browser.chrome && !this.browser.ie && this.detect('safari');
            this.browser.firefox = this.detect('firefox');
            this.browser.version = function () {
                try {
                    if (_this.browser.chrome) return Number(_this.agent.split('chrome/')[1].split('.')[0]);
                    if (_this.browser.firefox) return Number(_this.agent.split('firefox/')[1].split('.')[0]);
                    if (_this.browser.safari) return Number(_this.agent.split('version/')[1].split('.')[0].charAt(0));
                    if (_this.browser.ie) {
                        if (_this.detect('msie')) return Number(_this.agent.split('msie ')[1].split('.')[0]);
                        if (_this.detect('rv:')) return Number(_this.agent.split('rv:')[1].split('.')[0]);
                        return Number(_this.agent.split('edge/')[1].split('.')[0]);
                    }
                } catch (e) {
                    return -1;
                }
            }();
        }
    }, {
        key: 'detectTransform',
        value: function detectTransform() {
            this.vendor = this.prefix.css;
            this.transformProperty = function () {
                switch (this.prefix.lowercase) {
                    case 'moz':
                        return '-moz-transform';break;
                    case 'webkit':
                        return '-webkit-transform';break;
                    case 'o':
                        return '-o-transform';break;
                    case 'ms':
                        return '-ms-transform';break;
                    default:
                        return 'transform';break;
                }
            }();
        }
    }, {
        key: 'detectSystem',
        value: function detectSystem() {
            this.system = {};
            this.system.retina = window.devicePixelRatio > 1;
            this.system.webworker = typeof window.Worker !== 'undefined';
            this.system.offline = typeof window.applicationCache !== 'undefined';
            if (!window._NODE_) {
                this.system.geolocation = typeof navigator.geolocation !== 'undefined';
                this.system.pushstate = typeof window.history.pushState !== 'undefined';
            }
            this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            this.system.language = window.navigator.userLanguage || window.navigator.language;
            this.system.webaudio = typeof window.AudioContext !== 'undefined';
            try {
                this.system.localStorage = typeof window.localStorage !== 'undefined';
            } catch (e) {
                this.system.localStorage = false;
            }
            this.system.fullscreen = typeof document[this.prefix.lowercase + 'CancelFullScreen'] !== 'undefined';
            this.system.os = function () {
                if (_this.detect('mac os')) return 'mac';else if (_this.detect('windows nt 6.3')) return 'windows8.1';else if (_this.detect('windows nt 6.2')) return 'windows8';else if (_this.detect('windows nt 6.1')) return 'windows7';else if (_this.detect('windows nt 6.0')) return 'windowsvista';else if (_this.detect('windows nt 5.1')) return 'windowsxp';else if (_this.detect('windows')) return 'windows';else if (_this.detect('linux')) return 'linux';
                return 'undetected';
            }();

            this.pixelRatio = window.devicePixelRatio;
        }
    }, {
        key: 'detectStylesProperties',
        value: function detectStylesProperties() {
            this.styles = {};
            this.styles.filter = checkForTag('filter');
            this.styles.blendMode = checkForTag('mix-blend-mode');
            this.styles.vendor = this.prefix.unthis.prefixed ? '' : this.prefix.js;
            this.styles.vendorTransition = this.styles.vendor.length ? this.styles.vendor + 'Transition' : 'transition';
            this.styles.vendorTransform = this.styles.vendor.length ? this.styles.vendor + 'Transform' : 'transform';
        }
    }, {
        key: 'test',
        value: function test(name, _test) {
            this[name] = _test();
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

var _ParallaxAnimation = require('./../animations/ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	_createClass(_class, [{
		key: 'slide',
		value: function slide(from, to) {
			this.currentSlide = to;

			if (to === this.slideNumber) {

				var direction = from > to ? 'up' : 'down';
				this.ParallaxAnimationInst.clear();
				this.ParallaxAnimationInst.disable();

				this.el.classList.add('direction-' + direction);

				setTimeout(function () {
					this.el.classList.add('show');
					this.el.classList.add('animate-show');
				}.bind(this), 150);

				setTimeout(function () {
					this.el.classList.remove('animate-show');
				}.bind(this), 850);

				setTimeout(function () {
					this.ParallaxAnimationInst.enable();
					this.el.classList.remove('direction-' + direction);
				}.bind(this), 900);
			} else if (from == this.slideNumber) {
				this.el.classList.remove('show');
			}
		}
	}, {
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

	function _class(el, bounce, slideNumber) {
		_classCallCheck(this, _class);

		console.log(slideNumber);
		this.el = el;
		this.currentSlide = 1;
		this.slideNumber = slideNumber;
		this.bounce = bounce;
		this.ParallaxAnimationInst = new _ParallaxAnimation2.default(el, bounce, function () {});
	}

	_createClass(_class, [{
		key: 'update',
		value: function update(speed, direction) {
			if (this.currentSlide === this.slideNumber) {
				this.ParallaxAnimationInst.update(speed, direction);
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

var _Item = require('./Item.js');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseItem = function parseItem(el, sectionIndex) {
  var bounce = parseFloat(el.dataset.parallaxBounce);
  this.items.push(new _Item2.default(el, bounce, sectionIndex));
};

var getItems = function getItems() {
  var sections = this.config.wrapper.querySelectorAll('section');
  var self = this;
  Array.prototype.forEach.call(sections, function (section, index) {
    var items = section.querySelectorAll('[data-parallax-bounce]');
    Array.prototype.forEach.call(items, function (el) {
      parseItem.call(self, el, index + 1);
    });
  });
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
  }, {
    key: 'slide',
    value: function slide(from, to) {
      this.items.forEach(function (item) {
        return item.slide(from, to);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./Item.js":4}],6:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Device = require('./Device.js');

var _Device2 = _interopRequireDefault(_Device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
   function _class(callback) {
      _classCallCheck(this, _class);

      this.callback = callback;
   }

   _createClass(_class, [{
      key: 'add',
      value: function add() {

         var deviceInst = new _Device2.default();

         console.log(deviceInst);

         document.addEventListener('wheel', this.callback);
         document.addEventListener('mousewheel', this.callback);
      }
   }, {
      key: 'remove',
      value: function remove() {
         document.removeEventListener('wheel', this.callback);
         document.removeEventListener('mousewheel', this.callback);
      }
   }]);

   return _class;
}();

exports.default = _class;

},{"./Device.js":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ParallaxAnimation = require('./../animations/ParallaxAnimation.js');

var _ParallaxAnimation2 = _interopRequireDefault(_ParallaxAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animationDirections = {
	'SLIDE_UP': {
		condition: '>',
		'sign': '+'
	},
	'SLIDE_DOWN': {
		condition: '<',
		'sign': '-'
	}
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

var isFinish;

var animateSlideChange = function animateSlideChange(speed) {

	if (isFinish) {
		return;
	}

	eval('this.currentOffset ' + animationDirections[this.state].sign + '=12');
	eval('isFinish = this.currentOffset ' + animationDirections[this.state].condition + ' this.toScroll');

	if (isFinish) {
		this.ParallaxAnimationInst.changeGlobalTranslate(this.toScroll);
		this.currentOffset = this.toScroll;
		this.moveCollback(this.state === 'SLIDE_UP' ? this.currentPage + 1 : this.currentPage - 1, this.currentPage);
		isFinish = true;

		setTimeout(function () {
			this.state = 'PARALLAX';
			isFinish = false;
		}.bind(this), 1500);
	}

	// console.log(`${this.currentOffset} / ${this.toScroll}`);
	this.config.wrapper.style.transform = 'translateY(' + this.currentOffset + 'px)';
};

var _class = function () {
	_createClass(_class, [{
		key: 'slideDown',
		value: function slideDown() {
			if (this.currentPage < this.pagesCount) {
				++this.currentPage;
				this.toScroll = (this.currentPage - 1) * window.innerHeight * -1;
				this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
				this.state = 'SLIDE_DOWN';
				return true;
			}

			return false;
		}
	}, {
		key: 'slideUp',
		value: function slideUp() {
			if (this.currentPage !== 1) {
				--this.currentPage;
				this.toScroll = (this.currentPage - 1) * window.innerHeight * -1;
				this.currentOffset = this.ParallaxAnimationInst.getCurrentOffset();
				this.state = 'SLIDE_UP';
				return true;
			}

			return false;
		}
	}, {
		key: 'move',
		value: function move() {
			var id = arguments.length <= 0 || arguments[0] === undefined ? this.currentPage : arguments[0];

			console.log('Move to: ' + id);
		}
	}]);

	function _class(config, moveCollback) {
		_classCallCheck(this, _class);

		this.config = config;
		this.ParallaxAnimationInst = new _ParallaxAnimation2.default(config.wrapper, this.config.bounceWrapper);
		this.ParallaxAnimationInst.setMaxOffset(detectSlideChange.bind(this), this.config.maxParralaxWrapper);
		this.currentMouseDelta = 0;

		// Slide Animation
		this.currentPage = 1;
		this.pagesCount = 4;
		this.moveCollback = moveCollback;

		this.state = 'PARALLAX';
	}

	_createClass(_class, [{
		key: 'update',
		value: function update(speed, direction) {
			if (this.state === 'PARALLAX') {
				this.ParallaxAnimationInst.update(speed, direction);
			} else {
				animateSlideChange.call(this, speed);
			}
		}
	}]);

	return _class;
}();

exports.default = _class;

},{"./../animations/ParallaxAnimation.js":1}],8:[function(require,module,exports){

'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ScrollHandler = require('./ScrollHandler.js');

var _ScrollHandler2 = _interopRequireDefault(_ScrollHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timer = null;

var ACCELERATION = 1;
var MAX_SPEED = 80;
var WIND = 1.8;

var getCurrentState = function getCurrentState() {
   var speedAbs = Math.abs(this.currSpeed);

   if (this.scrolling && speedAbs < MAX_SPEED) {
      return this.direction === 'UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN';
   }

   if (!this.scrolling && this.direction === 'DOWN' && this.currSpeed > 0) {
      return 'MOVE_BACK_UP';
   }

   if (!this.scrolling && this.direction === 'UP' && this.currSpeed < 0) {
      return 'MOVE_BACK_DOWN';
   }

   if (this.direction === 'UP' && speedAbs >= MAX_SPEED) {
      return this.scrolling ? 'SCROLLING_MAX_UP' : 'MOVE_BACK_DOWN';
   }

   if (this.direction === 'UP' && speedAbs >= MAX_SPEED) {
      return this.scrolling ? 'SCROLLING_MAX_DOWN' : 'MOVE_BACK_UP';
   }

   if (speedAbs < 1.6) {
      return 'CLOSE_ZERO';
   }

   return 'IDLE';
};

var calcSpeed = function calcSpeed(state) {
   this.acceleration = ACCELERATION * Math.abs(this.currentDelta);
   // console.log(state);

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
      case 'CLOSE_ZERO':
         this.currSpeed = 0;break;
   }
};

var tick = function tick() {
   if (!this.active) {
      return;
   }

   var state = getCurrentState.call(this);

   calcSpeed.call(this, state);
   this.callback(this.currSpeed, this.direction);

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

   clearTimeout(timer);
   timer = setTimeout(setNotScrolling.bind(this), 160);
};

var _class = function () {
   _createClass(_class, [{
      key: 'disable',
      value: function disable() {
         this.active = false;
         this.scrollHandlerInst.remove();
      }
   }, {
      key: 'enable',
      value: function enable() {
         this.scrollHandlerInst.add();
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
      this.scrollHandlerInst = new _ScrollHandler2.default(onScroll.bind(this));
   }

   return _class;
}();

exports.default = _class;

},{"./ScrollHandler.js":6}],9:[function(require,module,exports){
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

},{}]},{},[2])


//# sourceMappingURL=parallaxOnePage.js.map
