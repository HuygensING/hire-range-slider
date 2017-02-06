'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;

var RangeSlider = function (_Component) {
	_inherits(RangeSlider, _Component);

	function RangeSlider(props) {
		_classCallCheck(this, RangeSlider);

		var _this = _possibleConstructorReturn(this, (RangeSlider.__proto__ || Object.getPrototypeOf(RangeSlider)).call(this, props));

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