(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.RangeSlider = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var inserted = {};

module.exports = function (css, options) {
    if (inserted[css]) return;
    inserted[css] = true;
    
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }
    
    var head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};

},{}],2:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var _insertCss = _dereq_("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);



var css = Buffer("LmhpcmUtcmFuZ2Utc2xpZGVyIHsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOwogICAgLW1zLXVzZXItc2VsZWN0OiBub25lOyAKICAgIHVzZXItc2VsZWN0OiBub25lOyAKICAgIC13ZWJraXQtdXNlci1kcmFnOiBub25lOwogICAgdXNlci1kcmFnOiBub25lOwoJY3Vyc29yOiBwb2ludGVyOwoJd2lkdGg6IDEwMCU7CglzdHJva2U6ICMwMDA7CglmaWxsOiAjMDAwOwp9CgouaGlyZS1yYW5nZS1zbGlkZXIgLnJhbmdlLWxpbmUgewoJc3Ryb2tlLXdpZHRoOiA4OwoJc3Ryb2tlLW9wYWNpdHk6IDAuMzsKfQoKLmhpcmUtcmFuZ2Utc2xpZGVyOmhvdmVyID4gLnJhbmdlLWxpbmUgewoJc3Ryb2tlLW9wYWNpdHk6IDAuMzU7Cn0KCi5oaXJlLXJhbmdlLXNsaWRlciAucmFuZ2UtbGluZSBjaXJjbGUgewoJc3Ryb2tlLXdpZHRoOiAwOwoJZmlsbC1vcGFjaXR5OiAwLjI7Cn0KCi5oaXJlLXJhbmdlLXNsaWRlciAucmFuZ2UtbGluZSBjaXJjbGUuaG92ZXJpbmcgewoJZmlsbC1vcGFjaXR5OiAxOwp9Cg==","base64");
(0, _insertCss2["default"])(css, { prepend: true });

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;

_react2["default"].initializeTouchEvents(true);

var RangeSlider = (function (_React$Component) {
	_inherits(RangeSlider, _React$Component);

	function RangeSlider(props) {
		_classCallCheck(this, RangeSlider);

		_get(Object.getPrototypeOf(RangeSlider.prototype), "constructor", this).call(this, props);

		this.mouseState = MOUSE_UP;
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.touchMoveListener = this.onTouchMove.bind(this);

		this.state = _extends({}, this.propsToState(this.props), { hoverState: null });
	}

	_createClass(RangeSlider, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("mouseup", this.mouseUpListener);
			window.addEventListener("mousemove", this.mouseMoveListener);
			window.addEventListener("touchend", this.mouseUpListener);
			window.addEventListener("touchmove", this.touchMoveListener);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState(this.propsToState(nextProps));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("mouseup", this.mouseUpListener);
			window.removeEventListener("mousemove", this.mouseMoveListener);
			window.removeEventListener("touchend", this.mouseUpListener);
			window.removeEventListener("touchmove", this.touchMoveListener);
		}
	}, {
		key: "propsToState",
		value: function propsToState(props) {
			var lowerLimit = props.lowerLimit || 0;
			var upperLimit = props.upperLimit || 1;
			return {
				lowerLimit: lowerLimit,
				upperLimit: upperLimit
			};
		}
	}, {
		key: "getPositionForLimit",
		value: function getPositionForLimit(pageX) {
			var rect = _react2["default"].findDOMNode(this).getBoundingClientRect();
			if (rect.width > 0) {
				var percentage = (pageX - rect.left) / rect.width;
				if (percentage > 1) {
					percentage = 1;
				} else if (percentage < 0) {
					percentage = 0;
				}
				var deltaL = Math.max(percentage - this.state.lowerLimit, this.state.lowerLimit - percentage);
				var deltaU = Math.max(percentage - this.state.upperLimit, this.state.upperLimit - percentage);
				if (deltaL < deltaU) {
					if (percentage >= this.state.upperLimit) {
						percentage = this.state.upperLimit;
					}
					return { lowerLimit: percentage };
				} else {
					if (percentage <= this.state.lowerLimit) {
						percentage = this.state.lowerLimit;
					}
					return { upperLimit: percentage };
				}
			}
			return null;
		}
	}, {
		key: "setRange",
		value: function setRange(pageX) {
			var posForLim = this.getPositionForLimit(pageX);
			if (posForLim !== null) {
				this.setState(posForLim);
				this.props.onChange(_extends({}, this.state, { refresh: false }));
			}
		}
	}, {
		key: "onMouseDown",
		value: function onMouseDown(ev) {
			this.mouseState = MOUSE_DOWN;
			this.setRange(ev.pageX);
		}
	}, {
		key: "onTouchStart",
		value: function onTouchStart(ev) {
			this.mouseState = MOUSE_DOWN;
			this.setRange(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.setRange(ev.pageX);
				return ev.preventDefault();
			} else if (_react2["default"].findDOMNode(this).contains(ev.target)) {
				var hoverState = Object.keys(this.getPositionForLimit(ev.pageX))[0];
				if (this.state.hoverState !== hoverState) {
					this.setState({ hoverState: hoverState });
				}
			} else if (this.state.hoverState !== null) {
				this.setState({ hoverState: null });
			}
		}
	}, {
		key: "onTouchMove",
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.setRange(ev.touches[0].pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: "onMouseUp",
		value: function onMouseUp() {
			if (this.mouseState === MOUSE_DOWN) {
				this.props.onChange(_extends({}, this.state, { refresh: true }));
			}
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: "getRangePath",
		value: function getRangePath() {
			return "M" + Math.floor(this.state.lowerLimit * 400) + " 10 L " + Math.ceil(this.state.upperLimit * 400) + " 10 Z";
		}
	}, {
		key: "getRangeCircle",
		value: function getRangeCircle(key) {
			var percentage = this.state[key];
			return _react2["default"].createElement("circle", { className: this.state.hoverState === key ? "hovering" : "", cx: percentage * 400, cy: "10", r: "4" });
		}
	}, {
		key: "render",
		value: function render() {

			return _react2["default"].createElement(
				"svg",
				{ className: "hire-range-slider",
					onMouseDown: this.onMouseDown.bind(this),
					onTouchStart: this.onTouchStart.bind(this),
					viewBox: "0 0 400 20" },
				_react2["default"].createElement(
					"g",
					{ className: "range-line" },
					_react2["default"].createElement("path", { d: this.getRangePath(), fill: "transparent" }),
					this.getRangeCircle("lowerLimit"),
					this.getRangeCircle("upperLimit")
				),
				_react2["default"].createElement("path", { d: "M0 0 L 0 20 Z", fill: "transparent" }),
				_react2["default"].createElement("path", { d: "M400 0 L 400 20 Z", fill: "transparent" }),
				_react2["default"].createElement("path", { d: "M0 10 L 400 10 Z", fill: "transparent" })
			);
		}
	}]);

	return RangeSlider;
})(_react2["default"].Component);

RangeSlider.propTypes = {
	lowerLimit: _react2["default"].PropTypes.number,
	onChange: _react2["default"].PropTypes.func.isRequired,
	upperLimit: _react2["default"].PropTypes.number
};

exports["default"] = RangeSlider;
module.exports = exports["default"];

},{"insert-css":1,"react":"react"}]},{},[2])(2)
});