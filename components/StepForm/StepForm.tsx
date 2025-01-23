// File: /components/StepForm/StepForm.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:43:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FormStep } from "@/constants/types";
import React from "react";
import FieldRenderer from "../FieldRenderer";
import StepHeader from "../StepHeader/StepHeader";
import { Form } from "../ui/form";
import { FieldError, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { toZod } from "../../utils/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";

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

  const formSchema = z.object(toZod(props.step.fields));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

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

  const firstError = Object.values(form.formState.errors)[0] as FieldError;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <StepHeader
          title={props.step.title || props.formTitle}
          subtitle={props.step.subtitle || props.formSubtitle}
        />
        <div className="flex flex-col gap-3">
          {props.step.fields.map((field, i) => {
            return (
              <FieldRenderer
                form={form}
                errored={form.formState.errors[field.name] as any}
                field={field}
                onChange={form.setValue}
                key={i}
                value={props.formData?.[field.name]}
              />
            );
          })}
        </div>
        {Object.keys(form.formState.errors).length ? (
          <div className="bg-red-200 text-white px-3 py-2 rounded-md mt-4 flex items-center gap-2">
            <TriangleAlert className="w-4 h-4 text-red-500" />
            <div>
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
