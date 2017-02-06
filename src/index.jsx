import React, { Component, PropTypes } from 'react';

const MOUSE_DOWN = 0;
const MOUSE_UP = 1;

class RangeSlider extends Component {
	constructor(props) {
		super(props);

		this.mouseState = MOUSE_UP;
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.touchMoveListener = this.onTouchMove.bind(this);

		this.state = {
			...this.propsToState(this.props),
			...{ hoverState: null },
		};
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.mouseUpListener);
		window.addEventListener('mousemove', this.mouseMoveListener);
		window.addEventListener('touchend', this.mouseUpListener);
		window.addEventListener('touchmove', this.touchMoveListener);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.propsToState(nextProps));
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.mouseUpListener);
		window.removeEventListener('mousemove', this.mouseMoveListener);
		window.removeEventListener('touchend', this.mouseUpListener);
		window.removeEventListener('touchmove', this.touchMoveListener);
	}

	getPositionForLimit(pageX) {
		const rect = this.refs.svg.getBoundingClientRect();

		if (rect.width > 0) {
			let percentage = (pageX - rect.left) / rect.width;
			if (percentage > 1) {
				percentage = 1;
			} else if (percentage < 0) {
				percentage = 0;
			}
			const center = (this.state.upperLimit + this.state.lowerLimit) / 2;

			if (this.state.hoverState === 'bar') {
				let lowerLimit = percentage + this.state.lowerLimit - center;
				let upperLimit = percentage - (center - this.state.upperLimit);
				if (upperLimit >= 1) { upperLimit = 1; }
				if (lowerLimit <= 0) { lowerLimit = 0; }
				return { lowerLimit, upperLimit };
			} else if (this.state.hoverState === 'lowerLimit') {
				if (percentage >= this.state.upperLimit) { percentage = this.state.upperLimit; }
				return { lowerLimit: percentage };
			} else if (this.state.hoverState === 'upperLimit') {
				if (percentage <= this.state.lowerLimit) { percentage = this.state.lowerLimit; }
				return { upperLimit: percentage };
			}
		}
		return null;
	}

	propsToState(props) {
		const lowerLimit = props.lowerLimit || 0;
		const upperLimit = props.upperLimit || 1;
		return {
			lowerLimit,
			upperLimit,
		};
	}

	setRange(pageX) {
		const posForLim = this.getPositionForLimit(pageX);
		if (posForLim !== null) {
			this.setState(posForLim);
			this.props.onChange({ ...this.state, refresh: false });
		}
	}

	onMouseDown(hoverState, ev) {
		this.mouseState = MOUSE_DOWN;
		this.setState({ hoverState });
		return ev.preventDefault();
	}


	onMouseMove(ev) {
		if (this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.pageX);
			return ev.preventDefault();
		}
	}

	onTouchMove(ev) {
		if (this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}

	onMouseUp() {
		if (this.mouseState === MOUSE_DOWN) {
			this.props.onChange({ ...this.state, refresh: true });
		}
		this.setState({ hoverState: null });
		this.mouseState = MOUSE_UP;
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

		return (
			<circle
				className={this.state.hoverState === key ? 'hovering' : ''}
				cx={this.props.handleRadius + percentage * 400}
				cy={this.props.handleRadius}
				onMouseDown={(ev) => this.onMouseDown(key, ev)}
				onTouchStart={(ev) => this.onMouseDown(key, ev)}
				r={this.props.handleRadius}
			/>
		);
	}

	render() {
		const keys = this.state.hoverState === 'lowerLimit' ?
			['upperLimit', 'lowerLimit'] :
			['lowerLimit', 'upperLimit'];

		return (
			<svg
				className="hire-range-slider"
				ref="svg"
				viewBox={`0 0 ${400 + this.props.handleRadius * 2} ${this.props.handleRadius * 2 + 2}`}
			>
				<path
					className="range-line"
					d={this.getRangeLine()}
					fill="transparent"
					strokeWidth={this.props.lineWidth}
				/>
				<g className="current-range-line">
					<path
						strokeWidth={this.props.lineWidth}
						className={this.state.hoverState === 'bar' ? 'hovering' : ''}
						d={this.getCurrentRangeLine()}
						onMouseDown={(ev) => this.onMouseDown('bar', ev)}
						onTouchStart={(ev) => this.onMouseDown('bar', ev)}
					/>
					{this.getRangeCircle(keys[0])}
					{this.getRangeCircle(keys[1])}
				</g>
			</svg>
		);
	}
}

RangeSlider.propTypes = {
	handleRadius: PropTypes.number,
	lineWidth: PropTypes.number,
	lowerLimit: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	upperLimit: PropTypes.number,
};

RangeSlider.defaultProps = {
	handleRadius: 8,
	lineWidth: 4,
};

export default RangeSlider;
