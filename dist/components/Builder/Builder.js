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
/**
 * Builder is a multi-step form component that handles form state management and navigation
 * between steps.
 *
 * @component
 * @param {Object} props - Component props
 * @param {FormStep[]} props.steps - Array of form steps, each containing fields and validation rules
 * @param {string} [props.title] - Optional title for the form
 * @param {string} [props.description] - Optional description/subtitle for the form
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {string} [props.nextLabel] - Optional custom label for the next button (defaults to "Next")
 * @param {string} [props.submitLabel] - Optional custom label for the submit button (defaults to "Submit")
 * @param {function} props.onSubmit - Callback function called with form data when the final step is submitted
 * @param {Object} [props.fieldComponentOverrides] - Optional map of custom field renderers by field type
 * @param {function} [props.actionsOverrides] - Optional custom renderer for form action buttons
 * @param {function} [props.headerOverrides] - Optional custom renderer for form header
 * @param {function} [props.formErrorOverrides] - Optional custom renderer for form validation errors
 *
 * @returns {React.ReactElement} A multi-step form component
 *
 * @example
 * <Builder
 *   steps={[
 *     { title: "Step 1", fields: [...] },
 *     { title: "Step 2", fields: [...] }
 *   ]}
 *   title="Registration Form"
 *   onSubmit={(data) => console.log(data)}
 * />
 */
const Builder = (props) => {
    const [currentStep, setCurrentStep] = (0, react_1.useState)(0);
    const [formData, setFormData] = (0, react_1.useReducer)(reducer, {});
    const handleSubmit = (data) => {
        let _data = {};
        Object.entries(data).forEach(([name, value]) => {
            setFormData({ name, value });
            _data[name] = value;
        });
        if (currentStep === props.steps.length - 1) {
            props.onSubmit(Object.assign(Object.assign({}, formData), _data));
        }
        else {
            setCurrentStep((p) => p + 1);
        }
    };
    const submitLabel = (0, react_1.useMemo)(() => {
        if (currentStep === props.steps.length - 1) {
            return props.submitLabel || "Submit";
        }
        return props.nextLabel || "Next";
    }, [currentStep, props.submitLabel, props.nextLabel]);
    return ((0, jsx_runtime_1.jsx)("div", { className: props.className, children: (0, jsx_runtime_1.jsx)(StepForm_1.default, { formTitle: props.title, formSubtitle: props.description, step: props.steps[currentStep], onSubmit: handleSubmit, submitLabel: submitLabel, stepIndex: currentStep, stepsLength: props.steps.length, onBack: () => setCurrentStep((p) => p - 1), formData: Object.fromEntries(Object.entries(formData).filter(([key]) => props.steps[currentStep].fields.some((f) => f.name === key))) }) }));
};
exports.default = Builder;
