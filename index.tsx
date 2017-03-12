import * as React from 'react';

const MOUSE_DOWN = 0;
const MOUSE_UP = 1;

interface IProps {
	handleRadius?: number;
	lineWidth?: number;
	lowerLimit?: number;
	onChange: (data: IOnChangeData) => void;
	upperLimit?: number;
}

interface IState {
	hoverState: string;
	lowerLimit?: number;
	upperLimit?: number;
}

interface IOnChangeData extends IState {
	refresh: boolean;
}

class RangeSlider extends React.Component<IProps, IState> {
	private mouseState = MOUSE_UP;
	private node;

	public state = {
		hoverState: null,
		lowerLimit: this.props.lowerLimit,
		upperLimit: this.props.upperLimit,
	};

	public static defaultProps: Partial<IProps> = {
		handleRadius: 8,
		lineWidth: 4,
		lowerLimit: 0,
		upperLimit: 1,
	};

	public componentDidMount() {
		window.addEventListener('mouseup', this.mouseUp);
		window.addEventListener('mousemove', this.mouseMove);
		window.addEventListener('touchend', this.mouseUp);
		window.addEventListener('touchmove', this.touchMove);
	}

	public componentWillReceiveProps(nextProps) {
		this.setState({
			lowerLimit: nextProps.lowerLimit,
			upperLimit: nextProps.upperLimit,
		});
	}

	public componentWillUnmount() {
		window.removeEventListener('mouseup', this.mouseUp);
		window.removeEventListener('mousemove', this.mouseMove);
		window.removeEventListener('touchend', this.mouseUp);
		window.removeEventListener('touchmove', this.touchMove);
	}

	private getPositionForLimit(pageX: number) {
		const rect: ClientRect = this.node.getBoundingClientRect();

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
				if (percentage >= this.state.upperLimit) {
					percentage = this.state.upperLimit;
				}
				return { lowerLimit: percentage };
			} else if (this.state.hoverState === 'upperLimit') {
				if (percentage <= this.state.lowerLimit) { percentage = this.state.lowerLimit; }
				return { upperLimit: percentage };
			}
		}

		return null;
	}

	private setRange(pageX) {
		const posForLim = this.getPositionForLimit(pageX);
		if (posForLim !== null) {
			this.setState(posForLim);
			this.props.onChange({ ...this.state, refresh: false });
		}
	}

	private mouseDown = (hoverState, ev) => {
		this.mouseState = MOUSE_DOWN;
		this.setState({ hoverState });
		return ev.preventDefault();
	};

	private mouseMove = (ev) => {
		if (this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.pageX);
			return ev.preventDefault();
		}
	};

	private mouseUp = () => {
		if (this.mouseState === MOUSE_DOWN) {
			this.props.onChange({ ...this.state, refresh: true });
			this.setState({ hoverState: null });
		}
		this.mouseState = MOUSE_UP;
	};

	private touchMove = (ev) => {
		if (this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	};

	private getRangeLine() {
		const radius = this.props.handleRadius;
		return `M${radius} ${radius} L ${400 + radius} ${radius} Z`;
	}

	private getCurrentRangeLine() {
		const startX = this.props.handleRadius + Math.floor(this.state.lowerLimit * 400);
		const endX = this.props.handleRadius + Math.ceil(this.state.upperLimit * 400);
		const y = this.props.handleRadius;
		return `M${startX} ${y} L ${endX} ${y} Z`;
	}

	private getRangeCircle(key) {
		const percentage = this.state[key];

		return (
			<circle
				className={this.state.hoverState === key ? 'hovering' : ''}
				cx={this.props.handleRadius + percentage * 400}
				cy={this.props.handleRadius}
				onMouseDown={(ev) => this.mouseDown(key, ev)}
				onTouchStart={(ev) => this.mouseDown(key, ev)}
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
				ref={(node) => {
					this.node = node;
				}}
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
						onMouseDown={(ev) => this.mouseDown('bar', ev)}
						onTouchStart={(ev) => this.mouseDown('bar', ev)}
					/>
					{this.getRangeCircle(keys[0])}
					{this.getRangeCircle(keys[1])}
				</g>
			</svg>
		);
	}
}

export default RangeSlider;
