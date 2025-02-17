// File: /Builder.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 6:39:18 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

"use client";
import {
  FormStep,
  FormStepFlex,
  FieldComponentOverrides,
} from "../../constants/types";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import StepForm from "../StepForm";
import { FieldErrors } from "react-hook-form";
import { fillInitialFormData } from "../../utils/data";
import {
  registerStepSubmission,
  registerFormSubmission,
  retrieveForm,
  getSubmission,
} from "formly-reactjs-core";
import { lessHlsVivid } from "@/src/utils/colors";
import { lessHlsVivid2 } from "@/src/utils/colors";

type BuilderProps = {
  steps?: FormStepFlex[];
  title?: string;
  description?: string;
  className?: string;
  nextLabel?: string;
  submitLabel?: string;
  defaultFormData?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
  onStepSubmit?: (args: {
    data: Record<string, any>;
    stepIndex: number;
    errors: FieldErrors<{ [x: string]: any }>;
  }) => Promise<void>;
  onChange?: (data: Record<string, any>, stepIndex: number) => void;
  isButtonLoading?: boolean;

  // Field Overwrites
  fieldComponentOverwrites?: Partial<FieldComponentOverrides>;

  // Actions Overwrites
  actionsOverwrites?: (args: {
    onBack: () => void;
    onSubmit: (data: Record<string, any>) => void;
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

  // Formly Dashboard
  options?: {
    publishableKey: string;
    formId: string;
  };
};

const reducer = (
  state: Record<string, string>,
  action: { name: string; value: any }
) => {
  if (action.name === "formly-fill-entire-form") {
    return { ...state, ...(action.value as any) };
  }
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
 * @param {Object} [props.options] - Optional options for the form
 * @param {string} [props.options.publishableKey] - The publishable key for the form
 * @param {string} [props.options.formId] - The form ID for the form
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
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [description, setDescription] = useState<string | undefined>(
    props.description
  );
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);
  const [steps, setSteps] = useState<FormStepFlex[]>(props.steps ?? []);
  const [formData, setFormData] = useReducer(
    reducer,
    fillInitialFormData(props.defaultFormData, steps)
  );

  useEffect(() => {
    setSteps(props.steps ?? []);
    setTitle(props.title);
    setDescription(props.description);
  }, [props.steps, props.title, props.description]);

  useEffect(() => {
    if (props.options?.formId && props.options?.publishableKey) {
      retrieveForm({
        publicKey: props.options.publishableKey,
        formId: props.options.formId,
      })
        .then(
          (form: {
            steps: FormStepFlex[];
            title?: string;
            description?: string;
            themeColor?: string;
          }) => {
            setSteps(form.steps);
            setTitle(form.title);
            setDescription(form.description);
            setThemeColor(form.themeColor);
            getSubmission({
              publicKey: props.options!.publishableKey,
              formId: props.options!.formId,
            }).then((submission) => {
              setFormData({
                name: "formly-fill-entire-form",
                value: submission,
              });
            });
          }
        )
        .finally(() => {});
    }
  }, []);

  const handleSubmit = async (data: Record<string, string>) => {
    let _data: Record<string, string> = {};
    Object.entries(data).forEach(([name, value]) => {
      setFormData({ name, value });
      _data[name] = value;
    });
    if (props.options?.formId && props.options?.publishableKey) {
      await registerFormSubmission({
        publicKey: props.options?.publishableKey,
        formId: props.options?.formId,
        data,
      });
    }
    if (currentStep === steps.length - 1) {
      props.onSubmit && (await props.onSubmit({ ...formData, ..._data }));
    } else {
      setCurrentStep((p) => p + 1);
    }
  };

  const submitLabel = useMemo(() => {
    if (currentStep === steps.length - 1) {
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

  const handleStepSubmit = async (args: {
    data: Record<string, string>;
    stepIndex: number;
    errors: FieldErrors<{ [x: string]: any }>;
  }): Promise<void> => {
    if (props.options?.formId && props.options?.publishableKey) {
      await registerStepSubmission({
        publicKey: props.options.publishableKey,
        formId: props.options.formId,
        data: args.data,
      });
    }
    if (props.onStepSubmit) {
      await props.onStepSubmit(args);
    }
  };

  const styleOverwrites = useMemo(() => {
    if (!themeColor) {
      return {};
    }
    return {
      ["--primary" as string]: lessHlsVivid(themeColor),
      ["--muted-foreground" as string]: lessHlsVivid2(themeColor),
    };
  }, [themeColor]);

  if (!steps.length) {
    return <></>;
  }

  // [--primary:84_100%_50%]
  return (
    <div className={`${props.className ?? ""}`} style={styleOverwrites}>
      <StepForm
        headerOverwrites={props.headerOverwrites}
        fieldOverwrites={props.fieldComponentOverwrites}
        actionsOverwrites={props.actionsOverwrites}
        formErrorOverwrites={props.formErrorOverwrites}
        formTitle={title}
        formSubtitle={description}
        step={steps[currentStep] as FormStep}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        stepIndex={currentStep}
        stepsLength={steps.length}
        isButtonLoading={props.isButtonLoading}
        onBack={() => setCurrentStep((p) => p - 1)}
        onStepSubmit={handleStepSubmit}
        formData={formData}
        stepFormData={Object.fromEntries(
          Object.entries(formData).filter(([key]) =>
            steps[currentStep].fields.some((f) => f.name === key)
          )
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default Builder;
