import React from "react";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

const MOUSE_DOWN = 0;
const MOUSE_UP = 1;

React.initializeTouchEvents(true);

class RangeFacet extends React.Component {
	constructor(props) {
		super(props);

		this.mouseState = MOUSE_UP;
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.touchMoveListener = this.onTouchMove.bind(this);

		this.state = {
			...this.propsToState(this.props),
			...{hoverState: null}
		};
	}

	componentDidMount() {
		window.addEventListener("mouseup", this.mouseUpListener);
		window.addEventListener("mousemove", this.mouseMoveListener);
		window.addEventListener("touchend", this.mouseUpListener);
		window.addEventListener("touchmove", this.touchMoveListener);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.propsToState(nextProps));
	}

	componentWillUnmount() {
		window.removeEventListener("mouseup", this.mouseUpListener);
		window.removeEventListener("mousemove", this.mouseMoveListener);
		window.removeEventListener("touchend", this.mouseUpListener);
		window.removeEventListener("touchmove", this.touchMoveListener);
	}



	propsToState(props) {
		let lowerLimit = props.lowerLimit || 0;
		let upperLimit = props.upperLimit || 1;
		return {
			lowerLimit: lowerLimit,
			upperLimit: upperLimit
		};
	}

	getPositionForLimit(pageX) {
		let rect = React.findDOMNode(this).getBoundingClientRect();
		if(rect.width > 0) {
			let percentage = (pageX - rect.left) / rect.width;
			if(percentage > 1) {
				percentage = 1;
			} else if(percentage < 0) {
				percentage = 0;
			}
			let deltaL = Math.max(percentage - this.state.lowerLimit, this.state.lowerLimit - percentage);
			let deltaU = Math.max(percentage - this.state.upperLimit, this.state.upperLimit - percentage);
			if(deltaL < deltaU) {
				if(percentage >= this.state.upperLimit) { percentage = this.state.upperLimit; }
				return {lowerLimit: percentage };
			} else {
				if(percentage <= this.state.lowerLimit) { percentage = this.state.lowerLimit; }
				return {upperLimit: percentage};
			}
		}
		return null;
	}

	setRange(pageX) {
		let posForLim = this.getPositionForLimit(pageX);
		if(posForLim !== null) {
			this.setState(posForLim);
			this.props.onChange({...this.state, refresh: false});
		}
	}

	onMouseDown(ev) {
		this.mouseState = MOUSE_DOWN;
		this.setRange(ev.pageX);
	}

	onTouchStart(ev) {
		this.mouseState = MOUSE_DOWN;
		this.setRange(ev.touches[0].pageX);
		return ev.preventDefault();
	}

	onMouseMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.pageX);
			return ev.preventDefault();
		} else if(React.findDOMNode(this).contains(ev.target)) {
			let hoverState = Object.keys(this.getPositionForLimit(ev.pageX))[0];
			if(this.state.hoverState !== hoverState) {
				this.setState({hoverState: hoverState});
			}
		} else if(this.state.hoverState !== null) {
			this.setState({hoverState: null});
		}
	}

	onTouchMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}

	onMouseUp() {
		if(this.mouseState === MOUSE_DOWN) {
			this.props.onChange({...this.state, refresh: true});
		}
		this.mouseState = MOUSE_UP;
	}

	getRangePath() {
		return "M" + Math.floor(this.state.lowerLimit * 400) + " 10 L " + Math.ceil(this.state.upperLimit * 400) + " 10 Z";
	}

	getRangeCircle(key) {
		let percentage = this.state[key];
		return (
			<circle className={this.state.hoverState === key ? "hovering" : ""} cx={percentage * 400} cy="10" r="4" />
		);
	}

	render() {

		return (
			<svg className="hire-range-slider"
				onMouseDown={this.onMouseDown.bind(this)}
				onTouchStart={this.onTouchStart.bind(this)}
				viewBox="0 0 400 20">
				<g className="range-line">
					<path d={this.getRangePath()} fill="transparent" />
					{this.getRangeCircle("lowerLimit")}
					{this.getRangeCircle("upperLimit")}
				</g>

				<path d="M0 0 L 0 20 Z" fill="transparent" />
				<path d="M400 0 L 400 20 Z" fill="transparent" />
				<path d="M0 10 L 400 10 Z" fill="transparent" />
			</svg>
		);
	}
}

RangeFacet.propTypes = {
	lowerLimit: React.PropTypes.number,
	onChange: React.PropTypes.func.isRequired,
	upperLimit: React.PropTypes.number
};


export default RangeFacet;