"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const StepHeader = (props) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-1", children: props.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mb-4", children: props.subtitle })] }));
};
exports.default = StepHeader;
