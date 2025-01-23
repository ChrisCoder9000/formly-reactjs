// File: /Builder.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 6:39:18 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { Field, FormStep } from "@/constants/types";
import React, { useMemo, useReducer, useState } from "react";
import StepForm from "../StepForm";
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
  fieldComponentOverrides?: Record<
    FieldType,
    (args: FieldRendererProps) => React.ComponentType<any>
  >;
  actionsOverrides?: (args: {
    onBack: () => void;
    onSubmit: (data: Record<string, string>) => void;
  }) => React.ComponentType<any>;
  headerOverrides?: (args: {
    title: string;
    subtitle: string;
  }) => React.ComponentType<any>;
  formErrorOverrides?: (args: {
    errors: Record<string, { message: string; name: string }>;
  }) => React.ComponentType<any>;
};

const reducer = (
  state: Record<string, string>,
  action: { name: string; value: string }
) => {
  return { ...state, [action.name]: action.value };
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
const Builder = (props: BuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useReducer(reducer, {});

  const handleSubmit = (data: Record<string, string>) => {
    let _data: Record<string, string> = {};
    Object.entries(data).forEach(([name, value]) => {
      setFormData({ name, value });
      _data[name] = value;
    });
    if (currentStep === props.steps.length - 1) {
      props.onSubmit({ ...formData, ..._data });
    } else {
      setCurrentStep((p) => p + 1);
    }
  };

  const submitLabel = useMemo(() => {
    if (currentStep === props.steps.length - 1) {
      return props.submitLabel || "Submit";
    }
    return props.nextLabel || "Next";
  }, [currentStep, props.submitLabel, props.nextLabel]);
  // [--primary:84_100%_50%]
  return (
    <div className={`${props.className}`}>
      <StepForm
        formTitle={props.title}
        formSubtitle={props.description}
        step={props.steps[currentStep]}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        stepIndex={currentStep}
        stepsLength={props.steps.length}
        onBack={() => setCurrentStep((p) => p - 1)}
        formData={Object.fromEntries(
          Object.entries(formData).filter(([key]) =>
            props.steps[currentStep].fields.some((f) => f.name === key)
          )
        )}
      />
    </div>
  );
};

export default Builder;
