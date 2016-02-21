(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Item = require("./modules/Item.js");

var _slidesContainer = require("./modules/slidesContainer.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parallaxOnePage = function parallaxOnePage(config) {
		_classCallCheck(this, parallaxOnePage);

		this.config = config;
		this.slidesContainer = new _slidesContainer.slidesContainer();
		this.items = [];
		this.items.push(new _Item.Item());
};

},{"./modules/Item.js":2,"./modules/slidesContainer.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function Item(config) {
  _classCallCheck(this, Item);

  this.config = config;
};

exports.default = Item;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slidesContainer = function slidesContainer(config) {
  _classCallCheck(this, slidesContainer);

  this.config = config;
};

exports.default = slidesContainer;

},{}]},{},[1])


//# sourceMappingURL=build.js.map
