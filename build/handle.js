"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("./index");
exports.default = (props) => React.createElement("circle", { cx: (props.radius) + (props.percentage * index_1.VIEW_BOX_WIDTH), cy: props.radius, fill: "white", onMouseDown: props.onMouseDown, onTouchStart: props.onTouchStart, r: props.radius, stroke: "gray", strokeWidth: props.strokeWidth });
