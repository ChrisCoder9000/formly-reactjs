// File: /components/StepForm/StepForm.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:43:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FormStep } from "../../constants/types";
import React from "react";
import FieldRenderer from "../FieldRenderer";
import StepHeader from "../StepHeader/StepHeader";
import { Form } from "../ui/form";
import { FieldError, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { fillNestedField, getNestedValue, toZod } from "../../utils/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { FieldType } from "../../constants/enums";

type StepFormProps = {
  step: FormStep;
  formTitle?: string;
  formSubtitle?: string;
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
  stepIndex: number;
  stepsLength: number;
  onBack?: () => void;
  formData?: Record<string, string>;
};

const StepForm = (props: StepFormProps) => {
  const validateStep = (): boolean => {
    return true;
  };

  const formRef = React.useRef<any>();
  const formSchema = z.object(toZod(props.step.fields));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: async (values, context, options) => {
      const schema = z.object(
        toZod(props.step.fields, formRef.current?.getValues())
      );
      return zodResolver(schema)(values, context, options);
    },
    mode: "onSubmit",
  });

  formRef.current = form;

  React.useEffect(() => {
    if (props.formData) {
      form.reset(props.formData);
    }
  }, [props.formData, form]);

  const handleSubmit = () => {
    const isValid = validateStep();
    if (isValid) {
      props.onSubmit(form.getValues());
    }
  };

  let firstError = Object.values(form.formState.errors)[0] as FieldError;

  if (Array.isArray(firstError)) {
    firstError = Object.values(
      Object.entries(firstError)[0][1]
    )[0] as FieldError;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <StepHeader
          title={props.step.title || props.formTitle}
          subtitle={props.step.subtitle || props.formSubtitle}
        />
        <div className="flex flex-col gap-4">
          {props.step.fields.map((field, i) => {
            return (
              <FieldRenderer
                form={form}
                errored={form.formState.errors[field.name] as any}
                field={field}
                onChange={(_, value) => {
                  const _formData = fillNestedField(
                    field.name,
                    value,
                    props.formData
                  );
                  form.setValue(field.name, _formData[field.name]);
                }}
                key={i}
                value={getNestedValue(field.name, form.getValues(), field.type)}
              />
            );
          })}
        </div>
        {Object.keys(form.formState.errors).length ? (
          <div className="bg-red-200 text-white px-3 py-2 rounded-md mt-4 flex items-center gap-2">
            <TriangleAlert className="w-4 h-4 text-red-500" />
            <div className="flex-1">
              <p className="text-red-500 text-sm">
                {firstError?.message ?? "Form is invalid"}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-end mt-4 gap-2">
          {props.stepIndex > 0 ? (
            <Button variant="ghost" type="button" onClick={props.onBack}>
              Back
            </Button>
          ) : (
            <></>
          )}
          <Button type="submit">{props.submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};

export default StepForm;
