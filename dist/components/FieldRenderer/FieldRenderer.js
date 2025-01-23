"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("../ui/input");
const form_1 = require("../ui/form");
const select_1 = require("../ui/select");
const textarea_1 = require("../ui/textarea");
const calendar_1 = require("../ui/calendar");
const date_fns_1 = require("date-fns");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("../ui/button");
const popover_1 = require("../ui/popover");
const enums_1 = require("@/constants/enums");
const FieldRenderer = (props) => {
    return ((0, jsx_runtime_1.jsx)(form_1.FormField, { name: props.field.name, control: props.form.control, render: (args) => {
            var _a;
            return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex flex-col gap-1", children: [props.field.label ? ((0, jsx_runtime_1.jsx)(form_1.FormLabel, { htmlFor: args.field.name, children: props.field.label })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(FieldSwitcher, Object.assign({}, props.field, { value: (_a = args.field.value) !== null && _a !== void 0 ? _a : props.value, errored: props.errored, onChange: props.onChange })), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { className: props.errored ? "text-red-500" : "", children: props.field.description })] }));
        } }));
};
const FieldSwitcher = (props) => {
    var _a, _b;
    switch (props.type) {
        case "text":
        case "number":
        case "email":
        case "url":
            return ((0, jsx_runtime_1.jsx)(input_1.Input, { type: props.type, value: (_a = props.value) !== null && _a !== void 0 ? _a : "", className: props.errored ? "border-red-500 bg-red-50" : "", placeholder: props.placeholder, onChange: (e) => props.onChange(props.name, e.target.value) }));
        case "secret":
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        case "phone":
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        case "text_area":
            return ((0, jsx_runtime_1.jsx)(textarea_1.Textarea, { value: (_b = props.value) !== null && _b !== void 0 ? _b : "", className: props.errored ? "border-red-500 bg-red-50" : "", placeholder: props.placeholder, onChange: (e) => props.onChange(props.name, e.target.value) }));
        case "select":
            if (!props.options) {
                throw new Error(`Select field ${props.name} must have options`);
            }
            return ((0, jsx_runtime_1.jsxs)(select_1.Select, { value: props.value, onValueChange: (value) => props.onChange(props.name, value), children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: `w-full ${props.errored ? "border-red-500 bg-red-50" : ""}`, children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Theme" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: props.options.map((option, i) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: option.value, children: option.label }, i))) })] }));
        case "date":
        case "date_range":
            return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: (0, utils_1.cn)("justify-start text-left font-normal", !props.value && "text-muted-foreground", props.errored && "border-red-500 bg-red-50 text-red-500"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CalendarIcon, {}), (() => {
                                    var _a, _b;
                                    if (!props.value) {
                                        return (0, jsx_runtime_1.jsx)("span", { children: "Pick a date" });
                                    }
                                    if (typeof props.value === "object" &&
                                        !(props.value instanceof Date)) {
                                        return ((_a = props.value) === null || _a === void 0 ? void 0 : _a.from) ? (((_b = props.value) === null || _b === void 0 ? void 0 : _b.to) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, date_fns_1.format)(props.value.from, "LLL dd, y"), " -", " ", (0, date_fns_1.format)(props.value.to, "LLL dd, y")] })) : ((0, date_fns_1.format)(props.value.from, "LLL dd, y"))) : ((0, jsx_runtime_1.jsx)("span", { children: "Pick a date" }));
                                    }
                                    return (0, date_fns_1.format)(props.value, "PPP");
                                })()] }) }), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-auto p-0", align: "start", children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, { mode: props.type === enums_1.FieldType.DATE
                                ? "single"
                                : props.type === enums_1.FieldType.DATE_RANGE
                                    ? "range"
                                    : "single", selected: props.value, onSelect: (date) => date && props.onChange(props.name, date) }) })] }));
        default:
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: "Unknown field type" }) }));
    }
};
exports.default = FieldRenderer;
