"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const StepForm_1 = __importDefault(require("../StepForm"));
const reducer = (state, action) => {
    return Object.assign(Object.assign({}, state), { [action.name]: action.value });
};
const Builder = (props) => {
    const [currentStep, setCurrentStep] = (0, react_1.useState)(0);
    const [formData, setFormData] = (0, react_1.useReducer)(reducer, {});
    const handleSubmit = (data) => {
        Object.entries(data).forEach(([name, value]) => {
            setFormData({ name, value });
        });
        setCurrentStep((p) => p + 1);
    };
    const submitLabel = (0, react_1.useMemo)(() => {
        if (currentStep === props.steps.length - 1) {
            return props.submitLabel || "Submit";
        }
        return props.nextLabel || "Next";
    }, [currentStep, props.submitLabel, props.nextLabel]);
    console.log(currentStep, formData);
    return ((0, jsx_runtime_1.jsx)("div", { className: props.className, children: (0, jsx_runtime_1.jsx)(StepForm_1.default, { formTitle: props.title, formSubtitle: props.description, step: props.steps[currentStep], onSubmit: handleSubmit, submitLabel: submitLabel, stepIndex: currentStep, stepsLength: props.steps.length, onBack: () => setCurrentStep((p) => p - 1) }) }));
};
exports.default = Builder;
