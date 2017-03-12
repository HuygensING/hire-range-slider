"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
var React = require('react');
var MOUSE_DOWN = 0;
var MOUSE_UP = 1;
var propsToState = function (props) {
    var lowerLimit = props.lowerLimit || 0;
    var upperLimit = props.upperLimit || 1;
    return {
        lowerLimit: lowerLimit,
        upperLimit: upperLimit,
    };
};
var RangeSlider = (function (_super) {
    __extends(RangeSlider, _super);
    function RangeSlider() {
        _super.apply(this, arguments);
        this.mouseState = MOUSE_UP;
        this.state = {
            hoverState: null,
            lowerLimit: this.props.lowerLimit,
            upperLimit: this.props.upperLimit,
        };
    }
    RangeSlider.prototype.componentDidMount = function () {
        window.addEventListener('mouseup', this.mouseUp);
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('touchend', this.mouseUp);
        window.addEventListener('touchmove', this.touchMove);
    };
    RangeSlider.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            lowerLimit: nextProps.lowerLimit,
            upperLimit: nextProps.upperLimit,
        });
    };
    RangeSlider.prototype.componentWillUnmount = function () {
        window.removeEventListener('mouseup', this.mouseUp);
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('touchend', this.mouseUp);
        window.removeEventListener('touchmove', this.touchMove);
    };
    RangeSlider.prototype.getPositionForLimit = function (pageX) {
        var rect = this.node.getBoundingClientRect();
        if (rect.width > 0) {
            var percentage = (pageX - rect.left) / rect.width;
            if (percentage > 1) {
                percentage = 1;
            }
            else if (percentage < 0) {
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
            }
            else if (this.state.hoverState === 'lowerLimit') {
                if (percentage >= this.state.upperLimit) {
                    percentage = this.state.upperLimit;
                }
                return { lowerLimit: percentage };
            }
            else if (this.state.hoverState === 'upperLimit') {
                if (percentage <= this.state.lowerLimit) {
                    percentage = this.state.lowerLimit;
                }
                return { upperLimit: percentage };
            }
        }
        return null;
    };
    RangeSlider.prototype.setRange = function (pageX) {
        var posForLim = this.getPositionForLimit(pageX);
        if (posForLim !== null) {
            this.setState(posForLim);
            (_a = this.props).onChange.apply(_a, [{}].concat(this.state, [refresh, false]));
        }
        ;
        var _a;
    };
    RangeSlider.defaultProps = {
        handleRadius: 8,
        lineWidth: 4,
        lowerLimit: 0,
        upperLimit: 1,
    };
    return RangeSlider;
}(React.Component));
mouseDown = function (hoverState, ev) {
    _this.mouseState = MOUSE_DOWN;
    _this.setState({ hoverState: hoverState });
    return ev.preventDefault();
};
mouseMove = function (ev) {
    if (_this.mouseState === MOUSE_DOWN) {
        _this.setRange(ev.pageX);
        return ev.preventDefault();
    }
};
mouseUp = function () {
    if (_this.mouseState === MOUSE_DOWN) {
        (_a = _this.props).onChange.apply(_a, [{}].concat(_this.state, [refresh, true]));
    }
    ;
    _this.setState({ hoverState: null });
    var _a;
};
this.mouseState = MOUSE_UP;
;
touchMove = function (ev) {
    if (_this.mouseState === MOUSE_DOWN) {
        _this.setRange(ev.touches[0].pageX);
        return ev.preventDefault();
    }
};
getRangeLine();
{
    var radius = this.props.handleRadius;
    return "M" + radius + " " + radius + " L " + (400 + radius) + " " + radius + " Z";
}
getCurrentRangeLine();
{
    var startX = this.props.handleRadius + Math.floor(this.state.lowerLimit * 400);
    var endX = this.props.handleRadius + Math.ceil(this.state.upperLimit * 400);
    var y = this.props.handleRadius;
    return "M" + startX + " " + y + " L " + endX + " " + y + " Z";
}
getRangeCircle(key);
{
    var percentage = this.state[key];
    return (<circle className={this.state.hoverState === key ? 'hovering' : ''} cx={this.props.handleRadius + percentage * 400} cy={this.props.handleRadius} onMouseDown={function (ev) { return this.mouseDown(key, ev); }} onTouchStart={function (ev) { return this.mouseDown(key, ev); }} r={this.props.handleRadius}/>);
}
render();
{
    var keys = this.state.hoverState === 'lowerLimit' ?
        ['upperLimit', 'lowerLimit'] :
        ['lowerLimit', 'upperLimit'];
    return (<svg className="hire-range-slider" ref={function (node) {
        this.node = node;
    }} viewBox={"0 0 " + (400 + this.props.handleRadius * 2) + " " + (this.props.handleRadius * 2 + 2)}>
				<path className="range-line" d={this.getRangeLine()} fill="transparent" strokeWidth={this.props.lineWidth}/>
				<g className="current-range-line">
					<path strokeWidth={this.props.lineWidth} className={this.state.hoverState === 'bar' ? 'hovering' : ''} d={this.getCurrentRangeLine()} onMouseDown={function (ev) { return this.mouseDown('bar', ev); }} onTouchStart={function (ev) { return this.mouseDown('bar', ev); }}/>
					{this.getRangeCircle(keys[0])}
					{this.getRangeCircle(keys[1])}
				</g>
			</svg>);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RangeSlider;
