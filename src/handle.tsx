import * as React from 'react'
import { VIEW_BOX_WIDTH } from './index'

interface Props {
	onMouseDown: (ev: any) => void
	onTouchStart: (ev: any) => void
	percentage: number
	radius: number
	strokeWidth: number
}
export default (props: Props) =>
	<circle
		cx={(props.radius) + (props.percentage * VIEW_BOX_WIDTH)}
		cy={props.radius}
		fill="white"
		onMouseDown={props.onMouseDown}
		onTouchStart={props.onTouchStart}
		r={props.radius}
		stroke="gray"
		strokeWidth={props.strokeWidth}
	/>


	// private getRangeCircle(key: HoverState) {
	// 	const percentage = key === HoverState.LowerLimit ?
	// 		this.state.lowerLimit :
	// 		this.state.upperLimit

	// 	return (
	// 		<circle
	// 			className={this.state.hoverState === key ? 'hovering' : ''}
	// 			cx={this.props.handleRadius + percentage * 400}
	// 			cy={this.props.handleRadius}
	// 			onMouseDown={(ev) => this.mouseDown(key, ev)}
	// 			onTouchStart={(ev) => this.mouseDown(key, ev)}
	// 			r={this.props.handleRadius}
	// 		/>
	// 	);
	// }