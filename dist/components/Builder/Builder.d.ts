import { FormStep } from "@/constants/types";
import React from "react";
import { FieldType } from "@/constants/enums";
import { FieldRendererProps } from "../FieldRenderer/FieldRenderer";
type BuilderProps = {
    steps: FormStep[];
    title?: string;
    description?: string;
    className?: string;
    nextLabel?: string;
    submitLabel?: string;
    onSubmit: (data: Record<string, string>) => void;
    fieldComponentOverrides?: Record<FieldType, (args: FieldRendererProps) => React.ComponentType<any>>;
    actionsOverrides?: (args: {
        onBack: () => void;
        onSubmit: (data: Record<string, string>) => void;
    }) => React.ComponentType<any>;
    headerOverrides?: (args: {
        title: string;
        subtitle: string;
    }) => React.ComponentType<any>;
    formErrorOverrides?: (args: {
        errors: Record<string, {
            message: string;
            name: string;
        }>;
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
declare const Builder: (props: BuilderProps) => import("react/jsx-runtime").JSX.Element;
export default Builder;
