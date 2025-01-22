"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("../ui/input");
const form_1 = require("../ui/form");
const react_hook_form_1 = require("react-hook-form");
const select_1 = require("../ui/select");
const FieldRenderer = (props) => {
    const form = (0, react_hook_form_1.useForm)();
    return ((0, jsx_runtime_1.jsx)(form_1.FormField, { name: props.field.name, control: form.control, render: (args) => {
            return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { htmlFor: args.field.name, children: props.field.label }), (0, jsx_runtime_1.jsx)(FieldSwitcher, Object.assign({}, props.field, { errored: props.errored, onChange: props.onChange })), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { className: props.errored ? "text-red-500" : "", children: props.field.description })] }));
        } }));
};
const FieldSwitcher = (props) => {
    switch (props.type) {
        case "text":
            return ((0, jsx_runtime_1.jsx)(input_1.Input, { className: props.errored ? "border-red-500 bg-red-50" : "", placeholder: props.placeholder, onChange: (e) => props.onChange(props.name, e.target.value) }));
        case "select":
            if (!props.options) {
                throw new Error(`Select field ${props.name} must have options`);
            }
            return ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: (value) => props.onChange(props.name, value), children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Theme" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: props.options.map((option, i) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: option.value, children: option.label }, i))) })] }));
        default:
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: "Unknown field type" }) }));
    }
};
exports.default = FieldRenderer;
