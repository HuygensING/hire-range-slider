import * as React from 'react';
import { VIEW_BOX_WIDTH } from './index';
export default (props) => React.createElement("circle", { cx: (props.radius + props.strokeWidth / 2) + (props.percentage * VIEW_BOX_WIDTH), cy: props.radius + props.strokeWidth / 2, fill: "white", onMouseDown: props.onMouseDown, onTouchStart: props.onTouchStart, r: props.radius, stroke: "gray", strokeWidth: props.strokeWidth });
