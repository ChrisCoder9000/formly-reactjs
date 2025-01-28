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
} from "../../constants/types";
import React, { useMemo, useReducer, useState } from "react";
import StepForm from "../StepForm";
import { FieldType, FieldTypeFlex } from "../../constants/enums";
import { cn } from "../../lib/utils";

type BuilderProps = {
  steps: FormStepFlex[];
  title?: string;
  description?: string;
  className?: string;
  nextLabel?: string;
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void;
  // onStepSubmit?: (data: Record<string, string>) => void;
  // onStepChange?: (step: FormStepFlex) => void;

  // Field Overwrites
  fieldComponentOverwrites?: Partial<FieldComponentOverrides>;

  // Actions Overwrites
  actionsOverwrites?: (args: {
    onBack: () => void;
    onSubmit: (data: Record<string, string>) => void;
  }) => React.ComponentType<any>;

  // Header Overwrites
  headerOverwrites?: (args: {
    title: string;
    subtitle: string;
  }) => React.ComponentType<any>;

  // Form Error Overwrites
  formErrorOverwrites?: (args: {
    errors: Record<string, { message: string; name: string }>;
  }) => React.ComponentType<any>;

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
  // [--primary:84_100%_50%]
  return (
    <div className={`${props.className ?? ""}`}>
      <StepForm
        fieldOverwrites={props.fieldComponentOverwrites}
        formTitle={props.title}
        formSubtitle={props.description}
        step={props.steps[currentStep] as FormStep}
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
      <div
        className={cn(
          "hidden",
          "bg-slate-50 bg-slate-100 bg-slate-200 bg-slate-300 bg-slate-400 bg-slate-500 bg-slate-600 bg-slate-700 bg-slate-800 bg-slate-900",
          "bg-gray-50 bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900",
          "bg-zinc-50 bg-zinc-100 bg-zinc-200 bg-zinc-300 bg-zinc-400 bg-zinc-500 bg-zinc-600 bg-zinc-700 bg-zinc-800 bg-zinc-900",
          "bg-neutral-50 bg-neutral-100 bg-neutral-200 bg-neutral-300 bg-neutral-400 bg-neutral-500 bg-neutral-600 bg-neutral-700 bg-neutral-800 bg-neutral-900",
          "bg-stone-50 bg-stone-100 bg-stone-200 bg-stone-300 bg-stone-400 bg-stone-500 bg-stone-600 bg-stone-700 bg-stone-800 bg-stone-900",
          "bg-red-50 bg-red-100 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-red-700 bg-red-800 bg-red-900",
          "bg-orange-50 bg-orange-100 bg-orange-200 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-700 bg-orange-800 bg-orange-900",
          "bg-amber-50 bg-amber-100 bg-amber-200 bg-amber-300 bg-amber-400 bg-amber-500 bg-amber-600 bg-amber-700 bg-amber-800 bg-amber-900",
          "bg-yellow-50 bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900",
          "bg-lime-50 bg-lime-100 bg-lime-200 bg-lime-300 bg-lime-400 bg-lime-500 bg-lime-600 bg-lime-700 bg-lime-800 bg-lime-900",
          "bg-green-50 bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900",
          "bg-emerald-50 bg-emerald-100 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-emerald-700 bg-emerald-800 bg-emerald-900",
          "bg-teal-50 bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal-900",
          "bg-cyan-50 bg-cyan-100 bg-cyan-200 bg-cyan-300 bg-cyan-400 bg-cyan-500 bg-cyan-600 bg-cyan-700 bg-cyan-800 bg-cyan-900",
          "bg-sky-50 bg-sky-100 bg-sky-200 bg-sky-300 bg-sky-400 bg-sky-500 bg-sky-600 bg-sky-700 bg-sky-800 bg-sky-900",
          "bg-blue-50 bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900",
          "bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900",
          "bg-violet-50 bg-violet-100 bg-violet-200 bg-violet-300 bg-violet-400 bg-violet-500 bg-violet-600 bg-violet-700 bg-violet-800 bg-violet-900",
          "bg-purple-50 bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900",
          "bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-200 bg-fuchsia-300 bg-fuchsia-400 bg-fuchsia-500 bg-fuchsia-600 bg-fuchsia-700 bg-fuchsia-800 bg-fuchsia-900",
          "bg-pink-50 bg-pink-100 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600 bg-pink-700 bg-pink-800 bg-pink-900",
          "bg-rose-50 bg-rose-100 bg-rose-200 bg-rose-300 bg-rose-400 bg-rose-500 bg-rose-600 bg-rose-700 bg-rose-800 bg-rose-900"
        )}
      />
    </div>
  );
};

export default Builder;
