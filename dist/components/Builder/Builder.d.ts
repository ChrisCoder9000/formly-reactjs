import { FormStep, FormStepFlex, FieldComponentOverrides, ColorsOverwrites } from "../../constants/types";
import React from "react";
import { FieldErrors } from "react-hook-form";
type BuilderProps = {
    steps: FormStepFlex[];
    title?: string;
    description?: string;
    className?: string;
    nextLabel?: string;
    color?: ColorsOverwrites;
    submitLabel?: string;
    defaultFormData?: Record<string, string>;
    onSubmit?: (data: Record<string, string>) => void;
    fieldComponentOverwrites?: Partial<FieldComponentOverrides>;
    actionsOverwrites?: (args: {
        onBack: () => void;
        onSubmit: (data: Record<string, string>) => void;
    }) => React.ReactElement<any>;
    headerOverwrites?: (args: {
        title: string | undefined;
        subtitle: string | undefined;
    }) => React.ReactElement<any>;
    formErrorOverwrites?: (args: {
        errors: FieldErrors<{
            [x: string]: any;
        }>;
    }) => React.ReactElement<any>;
    stepOverwrites?: (args: {
        step: FormStep;
        title: string;
        subtitle: string;
        currentIndex: number;
        stepsLength: number;
        onBack: () => void;
        onSubmit: (data: Record<string, string>) => void;
        formData: Record<string, string>;
    }) => React.ComponentType<any>;
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
 * @param {Object} [props.fieldComponentOverwrites] - Optional map of custom field renderers by field type
 * @param {function} [props.actionsOverwrites] - Optional custom renderer for form action buttons
 * @param {function} [props.headerOverwrites] - Optional custom renderer for form header
 * @param {function} [props.formErrorOverwrites] - Optional custom renderer for form validation errors
 * @param {Object} [props.defaultFormData] - Optional initial form data to fill in the fields
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
declare const Builder: (props: BuilderProps) => import("react/jsx-runtime").JSX.Element;
export default Builder;
