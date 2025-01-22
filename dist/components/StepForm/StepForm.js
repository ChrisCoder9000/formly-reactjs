"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const FieldRenderer_1 = __importDefault(require("../FieldRenderer"));
const StepHeader_1 = __importDefault(require("../StepHeader/StepHeader"));
const form_1 = require("../ui/form");
const react_hook_form_1 = require("react-hook-form");
const button_1 = require("../ui/button");
const zod_1 = require("zod");
const data_1 = require("@/utils/data");
const zod_2 = require("@hookform/resolvers/zod");
const lucide_react_1 = require("lucide-react");
const StepForm = (props) => {
    var _a;
    const validateStep = () => {
        return true;
    };
    const handleSubmit = () => {
        const isValid = validateStep();
        if (isValid) {
            props.onSubmit(form.getValues());
        }
    };
    const formSchema = zod_1.z.object((0, data_1.toZod)(props.step.fields));
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(formSchema),
    });
    const firstError = Object.values(form.formState.errors)[0];
    return ((0, jsx_runtime_1.jsx)(form_1.Form, Object.assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(handleSubmit), children: [(0, jsx_runtime_1.jsx)(StepHeader_1.default, { title: props.step.title || props.formTitle, subtitle: props.step.subtitle || props.formSubtitle }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: props.step.fields.map((field, i) => {
                        return ((0, jsx_runtime_1.jsx)(FieldRenderer_1.default, { errored: form.formState.errors[field.name], field: field, onChange: form.setValue }, i));
                    }) }), Object.keys(form.formState.errors).length ? ((0, jsx_runtime_1.jsxs)("div", { className: "bg-red-200 text-white px-3 py-2 rounded-md mt-4 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TriangleAlert, { className: "w-4 h-4 text-red-500" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: (_a = firstError === null || firstError === void 0 ? void 0 : firstError.message) !== null && _a !== void 0 ? _a : "Form is invalid" }) })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end mt-4 gap-2", children: [props.stepIndex > 0 ? ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", type: "button", onClick: props.onBack, children: "Back" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: props.submitLabel })] })] }) })));
};
exports.default = StepForm;
