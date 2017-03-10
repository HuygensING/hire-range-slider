"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MOUSE_DOWN = 0;
const MOUSE_UP = 1;
const propsToState = (props) => {
    const lowerLimit = props.lowerLimit || 0;
    const upperLimit = props.upperLimit || 1;
    return {
        lowerLimit,
        upperLimit,
    };
};
class RangeSlider extends React.Component {
    constructor() {
        super(...arguments);
        this.mouseState = MOUSE_UP;
        this.state = Object.assign({}, propsToState(this.props), { hoverState: null });
        this.mouseDown = (hoverState, ev) => {
            this.mouseState = MOUSE_DOWN;
            this.setState({ hoverState });
            return ev.preventDefault();
        };
        this.mouseMove = (ev) => {
            if (this.mouseState === MOUSE_DOWN) {
                this.setRange(ev.pageX);
                return ev.preventDefault();
            }
        };
        this.mouseUp = () => {
            if (this.mouseState === MOUSE_DOWN) {
                this.props.onChange(Object.assign({}, this.state, { refresh: true }));
            }
            this.setState({ hoverState: null });
            this.mouseState = MOUSE_UP;
        };
        this.touchMove = (ev) => {
            if (this.mouseState === MOUSE_DOWN) {
                this.setRange(ev.touches[0].pageX);
                return ev.preventDefault();
            }
        };
    }
    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUp);
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('touchend', this.mouseUp);
        window.addEventListener('touchmove', this.touchMove);
    }
    componentWillReceiveProps(nextProps) {
        this.setState(propsToState(nextProps));
    }
    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUp);
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('touchend', this.mouseUp);
        window.removeEventListener('touchmove', this.touchMove);
    }
    getPositionForLimit(pageX) {
        const rect = this.node.getBoundingClientRect();
        if (rect.width > 0) {
            let percentage = (pageX - rect.left) / rect.width;
            if (percentage > 1) {
                percentage = 1;
            }
            else if (percentage < 0) {
                percentage = 0;
            }
            const center = (this.state.upperLimit + this.state.lowerLimit) / 2;
            if (this.state.hoverState === 'bar') {
                let lowerLimit = percentage + this.state.lowerLimit - center;
                let upperLimit = percentage - (center - this.state.upperLimit);
                if (upperLimit >= 1) {
                    upperLimit = 1;
                }
                if (lowerLimit <= 0) {
                    lowerLimit = 0;
                }
                return { lowerLimit, upperLimit };
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
    }
    setRange(pageX) {
        const posForLim = this.getPositionForLimit(pageX);
        if (posForLim !== null) {
            this.setState(posForLim);
            this.props.onChange(Object.assign({}, this.state, { refresh: false }));
        }
    }
    getRangeLine() {
        const radius = this.props.handleRadius;
        return `M${radius} ${radius} L ${400 + radius} ${radius} Z`;
    }
    getCurrentRangeLine() {
        const startX = this.props.handleRadius + Math.floor(this.state.lowerLimit * 400);
        const endX = this.props.handleRadius + Math.ceil(this.state.upperLimit * 400);
        const y = this.props.handleRadius;
        return `M${startX} ${y} L ${endX} ${y} Z`;
    }
    getRangeCircle(key) {
        const percentage = this.state[key];
        return (React.createElement("circle", { className: this.state.hoverState === key ? 'hovering' : '', cx: this.props.handleRadius + percentage * 400, cy: this.props.handleRadius, onMouseDown: (ev) => this.mouseDown(key, ev), onTouchStart: (ev) => this.mouseDown(key, ev), r: this.props.handleRadius }));
    }
    render() {
        const keys = this.state.hoverState === 'lowerLimit' ?
            ['upperLimit', 'lowerLimit'] :
            ['lowerLimit', 'upperLimit'];
        return (React.createElement("svg", { className: "hire-range-slider", ref: (node) => {
                this.node = node;
            }, viewBox: `0 0 ${400 + this.props.handleRadius * 2} ${this.props.handleRadius * 2 + 2}` },
            React.createElement("path", { className: "range-line", d: this.getRangeLine(), fill: "transparent", strokeWidth: this.props.lineWidth }),
            React.createElement("g", { className: "current-range-line" },
                React.createElement("path", { strokeWidth: this.props.lineWidth, className: this.state.hoverState === 'bar' ? 'hovering' : '', d: this.getCurrentRangeLine(), onMouseDown: (ev) => this.mouseDown('bar', ev), onTouchStart: (ev) => this.mouseDown('bar', ev) }),
                this.getRangeCircle(keys[0]),
                this.getRangeCircle(keys[1]))));
    }
}
exports.default = RangeSlider;
