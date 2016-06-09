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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

var _insertCss = _dereq_('insert-css');

var _insertCss2 = _interopRequireDefault(_insertCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var css = Buffer("LmhpcmUtcmFuZ2Utc2xpZGVyIHsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOwogICAgLW1zLXVzZXItc2VsZWN0OiBub25lOwogICAgdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtd2Via2l0LXVzZXItZHJhZzogbm9uZTsKICAgIHVzZXItZHJhZzogbm9uZTsKCWN1cnNvcjogcG9pbnRlcjsKCXdpZHRoOiAxMDAlOwoJc3Ryb2tlOiAjZjFlYmU2OwoJZmlsbDogI2YxZWJlNjsKfQoKLyouaGlyZS1yYW5nZS1zbGlkZXIgLmN1cnJlbnQtcmFuZ2UtbGluZSB7CglzdHJva2Utd2lkdGg6IDg7Cn0qLwoKLmhpcmUtcmFuZ2Utc2xpZGVyOmhvdmVyID4gLmN1cnJlbnQtcmFuZ2UtbGluZSB7Cgp9CgouaGlyZS1yYW5nZS1zbGlkZXIgLmN1cnJlbnQtcmFuZ2UtbGluZSBjaXJjbGUgewoJc3Ryb2tlLXdpZHRoOiAwOwp9CgouaGlyZS1yYW5nZS1zbGlkZXIgLmN1cnJlbnQtcmFuZ2UtbGluZSBjaXJjbGUuaG92ZXJpbmcsCi5oaXJlLXJhbmdlLXNsaWRlciAuY3VycmVudC1yYW5nZS1saW5lIGNpcmNsZTpob3ZlciB7CglmaWxsOiAjYmRhNDdlOwp9CgouaGlyZS1yYW5nZS1zbGlkZXIgLmN1cnJlbnQtcmFuZ2UtbGluZSBwYXRoLmhvdmVyaW5nLAouaGlyZS1yYW5nZS1zbGlkZXIgLmN1cnJlbnQtcmFuZ2UtbGluZSBwYXRoOmhvdmVyIHsKCXN0cm9rZTogI2JkYTQ3ZTsKfQo=","base64");
if (typeof window !== 'undefined' && window.document) {
	(0, _insertCss2.default)(css, { prepend: true });
}

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;

var RangeSlider = function (_Component) {
	_inherits(RangeSlider, _Component);

	function RangeSlider(props) {
		_classCallCheck(this, RangeSlider);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RangeSlider).call(this, props));

		_this.mouseState = MOUSE_UP;
		_this.mouseUpListener = _this.onMouseUp.bind(_this);
		_this.mouseMoveListener = _this.onMouseMove.bind(_this);
		_this.touchMoveListener = _this.onTouchMove.bind(_this);

		_this.state = _extends({}, _this.propsToState(_this.props), { hoverState: null });
		return _this;
	}

	_createClass(RangeSlider, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('mouseup', this.mouseUpListener);
			window.addEventListener('mousemove', this.mouseMoveListener);
			window.addEventListener('touchend', this.mouseUpListener);
			window.addEventListener('touchmove', this.touchMoveListener);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState(this.propsToState(nextProps));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('mouseup', this.mouseUpListener);
			window.removeEventListener('mousemove', this.mouseMoveListener);
			window.removeEventListener('touchend', this.mouseUpListener);
			window.removeEventListener('touchmove', this.touchMoveListener);
		}
	}, {
		key: 'getPositionForLimit',
		value: function getPositionForLimit(pageX) {
			var rect = this.refs.svg.getBoundingClientRect();

			if (rect.width > 0) {
				var percentage = (pageX - rect.left) / rect.width;
				if (percentage > 1) {
					percentage = 1;
				} else if (percentage < 0) {
					percentage = 0;
				}
				var center = (this.state.upperLimit + this.state.lowerLimit) / 2;

				if (this.state.hoverState === 'bar') {
					var lowerLimit = percentage + this.state.lowerLimit - center;
					var upperLimit = percentage - (center - this.state.upperLimit);
					if (upperLimit >= 1) {
						upperLimit = 1;
					}
					if (lowerLimit <= 0) {
						lowerLimit = 0;
					}
					return { lowerLimit: lowerLimit, upperLimit: upperLimit };
				} else if (this.state.hoverState === 'lowerLimit') {
					if (percentage >= this.state.upperLimit) {
						percentage = this.state.upperLimit;
					}
					return { lowerLimit: percentage };
				} else if (this.state.hoverState === 'upperLimit') {
					if (percentage <= this.state.lowerLimit) {
						percentage = this.state.lowerLimit;
					}
					return { upperLimit: percentage };
				}
			}
			return null;
		}
	}, {
		key: 'propsToState',
		value: function propsToState(props) {
			var lowerLimit = props.lowerLimit || 0;
			var upperLimit = props.upperLimit || 1;
			return {
				lowerLimit: lowerLimit,
				upperLimit: upperLimit
			};
		}
	}, {
		key: 'setRange',
		value: function setRange(pageX) {
			var posForLim = this.getPositionForLimit(pageX);
			if (posForLim !== null) {
				this.setState(posForLim);
				this.props.onChange(_extends({}, this.state, { refresh: false }));
			}
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown(hoverState, ev) {
			this.mouseState = MOUSE_DOWN;
			this.setState({ hoverState: hoverState });
			return ev.preventDefault();
		}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.setRange(ev.pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: 'onTouchMove',
		value: function onTouchMove(ev) {
			if (this.mouseState === MOUSE_DOWN) {
				this.setRange(ev.touches[0].pageX);
				return ev.preventDefault();
			}
		}
	}, {
		key: 'onMouseUp',
		value: function onMouseUp() {
			if (this.mouseState === MOUSE_DOWN) {
				this.props.onChange(_extends({}, this.state, { refresh: true }));
			}
			this.setState({ hoverState: null });
			this.mouseState = MOUSE_UP;
		}
	}, {
		key: 'getRangeLine',
		value: function getRangeLine() {
			var radius = this.props.handleRadius;
			return 'M' + radius + ' ' + radius + ' L ' + (400 + radius) + ' ' + radius + ' Z';
		}
	}, {
		key: 'getCurrentRangeLine',
		value: function getCurrentRangeLine() {
			var startX = this.props.handleRadius + Math.floor(this.state.lowerLimit * 400);
			var endX = this.props.handleRadius + Math.ceil(this.state.upperLimit * 400);
			var y = this.props.handleRadius;
			return 'M' + startX + ' ' + y + ' L ' + endX + ' ' + y + ' Z';
		}
	}, {
		key: 'getRangeCircle',
		value: function getRangeCircle(key) {
			var _this2 = this;

			var percentage = this.state[key];

			return _react2.default.createElement('circle', {
				className: this.state.hoverState === key ? 'hovering' : '',
				cx: this.props.handleRadius + percentage * 400,
				cy: this.props.handleRadius,
				onMouseDown: function onMouseDown(ev) {
					return _this2.onMouseDown(key, ev);
				},
				onTouchStart: function onTouchStart(ev) {
					return _this2.onMouseDown(key, ev);
				},
				r: this.props.handleRadius
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var keys = this.state.hoverState === 'lowerLimit' ? ['upperLimit', 'lowerLimit'] : ['lowerLimit', 'upperLimit'];

			return _react2.default.createElement(
				'svg',
				{
					className: 'hire-range-slider',
					ref: 'svg',
					viewBox: '0 0 ' + (400 + this.props.handleRadius * 2) + ' ' + (this.props.handleRadius * 2 + 2)
				},
				_react2.default.createElement('path', {
					className: 'range-line',
					d: this.getRangeLine(),
					fill: 'transparent',
					strokeWidth: this.props.lineWidth
				}),
				_react2.default.createElement(
					'g',
					{ className: 'current-range-line' },
					_react2.default.createElement('path', {
						strokeWidth: this.props.lineWidth,
						className: this.state.hoverState === 'bar' ? 'hovering' : '',
						d: this.getCurrentRangeLine(),
						onMouseDown: function onMouseDown(ev) {
							return _this3.onMouseDown('bar', ev);
						},
						onTouchStart: function onTouchStart(ev) {
							return _this3.onMouseDown('bar', ev);
						}
					}),
					this.getRangeCircle(keys[0]),
					this.getRangeCircle(keys[1])
				)
			);
		}
	}]);

	return RangeSlider;
}(_react.Component);

RangeSlider.propTypes = {
	handleRadius: _react.PropTypes.number,
	lineWidth: _react.PropTypes.number,
	lowerLimit: _react.PropTypes.number,
	onChange: _react.PropTypes.func.isRequired,
	upperLimit: _react.PropTypes.number
};

RangeSlider.defaultProps = {
	handleRadius: 8,
	lineWidth: 4
};

exports.default = RangeSlider;

},{"insert-css":1,"react":"react"}]},{},[2])(2)
});