// File: /Builder.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 6:39:18 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

"use client";

import {
  Field,
  FormFieldOverrides,
  FormStep,
  FormStepFlex,
  FieldComponentOverrides,
  ColorsOverwrites,
} from "../../constants/types";
import React, { useMemo, useReducer, useState } from "react";
import StepForm from "../StepForm";
import { FieldType, FieldTypeFlex } from "../../constants/enums";
import { cn } from "../../lib/utils";
import { TW_COLORS } from "../../constants/colors";
import { FieldError, FieldErrors } from "react-hook-form";
import { fillInitialFormData } from "../../utils/data";

type BuilderProps = {
  steps: FormStepFlex[];
  title?: string;
  description?: string;
  className?: string;
  nextLabel?: string;
  submitLabel?: string;
  defaultFormData?: Record<string, string>;
  onSubmit?: (data: Record<string, string>) => void;
  onStepSubmit?: (args: {
    data: Record<string, string>;
    stepIndex: number;
    errors: FieldErrors<{ [x: string]: any }>;
  }) => Promise<void>;
  onChange?: (data: Record<string, string>, stepIndex: number) => void;
  isButtonLoading?: boolean;

  // Field Overwrites
  fieldComponentOverwrites?: Partial<FieldComponentOverrides>;

  // Actions Overwrites
  actionsOverwrites?: (args: {
    onBack: () => void;
    onSubmit: (data: Record<string, string>) => void;
    isButtonLoading?: boolean;
  }) => React.ReactElement<any>;

  // Header Overwrites
  headerOverwrites?: (args: {
    title: string | undefined;
    subtitle: string | undefined;
  }) => React.ReactElement<any>;

  // Form Error Overwrites
  formErrorOverwrites?: (args: {
    errors: FieldErrors<{ [x: string]: any }>;
  }) => React.ReactElement<any>;

  // Step Overwrites
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
export const Builder = (props: BuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useReducer(
    reducer,
    fillInitialFormData(props.defaultFormData, props.steps)
  );

  const handleSubmit = (data: Record<string, string>) => {
    let _data: Record<string, string> = {};
    Object.entries(data).forEach(([name, value]) => {
      setFormData({ name, value });
      _data[name] = value;
    });
    if (currentStep === props.steps.length - 1) {
      props.onSubmit && props.onSubmit({ ...formData, ..._data });
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

  const handleChange = (data: Record<string, string>, stepIndex: number) => {
    if (props.onChange) {
      props.onChange(data || {}, stepIndex);
    }
    for (const [name, value] of Object.entries(data)) {
      setFormData({ name, value });
    }
  };

  // [--primary:84_100%_50%]
  return (
    <div className={`${props.className ?? ""}`}>
      <StepForm
        headerOverwrites={props.headerOverwrites}
        fieldOverwrites={props.fieldComponentOverwrites}
        actionsOverwrites={props.actionsOverwrites}
        formErrorOverwrites={props.formErrorOverwrites}
        formTitle={props.title}
        formSubtitle={props.description}
        step={props.steps[currentStep] as FormStep}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        stepIndex={currentStep}
        stepsLength={props.steps.length}
        isButtonLoading={props.isButtonLoading}
        onBack={() => setCurrentStep((p) => p - 1)}
        onStepSubmit={props.onStepSubmit}
        formData={Object.fromEntries(
          Object.entries(formData).filter(([key]) =>
            props.steps[currentStep].fields.some((f) => f.name === key)
          )
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default Builder;
