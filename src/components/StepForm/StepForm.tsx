// File: /components/StepForm/StepForm.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:43:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import {
  Field,
  FieldOverwriteOnChangeProps,
  FormFieldOverrides,
  FormStep,
  FormStepFlex,
  FieldComponentOverrides,
  ColorsOverwrites,
} from "../../constants/types";
import React from "react";
import StepHeader from "../StepHeader/StepHeader";
import { Form } from "../ui/form";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { fillNestedField, getNestedValue, toZod } from "../../utils/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { FieldType } from "../../constants/enums";
import FieldRendererWithOverwriteHandler from "../FieldRendererWithOverwriteHandler";
import { TW_COLORS } from "../../constants/colors";
import { colorBuilder } from "../../utils/colors";
import { cn } from "../../lib/utils";

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
  fieldOverwrites?: Partial<FieldComponentOverrides>;
  headerOverwrites?: (props: {
    title: string | undefined;
    subtitle: string | undefined;
  }) => React.ReactElement;
  actionsOverwrites?: (props: {
    onBack: () => void;
    onSubmit: () => void;
  }) => React.ReactElement;
  formErrorOverwrites?: (props: {
    errors: FieldErrors<{ [x: string]: any }>;
  }) => React.ReactElement;
  onStepSubmit?: (args: {
    data: Record<string, string>;
    stepIndex: number;
    errors: FieldErrors<{ [x: string]: any }>;
  }) => void;
};

const StepForm = (props: StepFormProps) => {
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
    props.onSubmit(form.getValues());
  };

  let firstError = Object.values(form.formState.errors)[0] as FieldError;

  if (Array.isArray(firstError)) {
    firstError = Object.values(
      Object.entries(firstError)[0][1]
    )[0] as FieldError;
  }

  const handleStepSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const onValid = () => {
      if (props.onStepSubmit) {
        props.onStepSubmit({
          data: form.getValues(),
          stepIndex: props.stepIndex,
          errors: form.formState.errors,
        });
      }
      handleSubmit();
    };

    const onInvalid = () => {
      if (props.onStepSubmit) {
        props.onStepSubmit({
          data: form.getValues(),
          stepIndex: props.stepIndex,
          errors: form.formState.errors,
        });
      }
    };

    form.handleSubmit(onValid, onInvalid)(e);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleStepSubmit}
        // className={cn(
        //   colorBuilder("bg", props.color?.background ?? "gray", "100/05")
        // )}
      >
        {props.headerOverwrites ? (
          props.headerOverwrites({
            title: props.step.title || props.formTitle,
            subtitle: props.step.subtitle || props.formSubtitle,
          })
        ) : (
          <StepHeader
            title={props.step.title || props.formTitle}
            subtitle={props.step.subtitle || props.formSubtitle}
          />
        )}
        <div className="flex flex-col gap-4">
          {props.step.fields.map((_field: any, i) => {
            const field = _field as Omit<Field, "type"> & { type: FieldType };
            return (
              <FieldRendererWithOverwriteHandler
                key={i}
                field={field}
                fieldOverwrites={props.fieldOverwrites}
                formData={props.formData ?? form.getValues()}
                stepIndex={props.stepIndex}
                form={form}
                value={form.getValues()?.[field.name]}
              />
            );
          })}
        </div>
        {props.formErrorOverwrites ? (
          props.formErrorOverwrites({
            errors: form.formState.errors,
          })
        ) : Object.keys(form.formState.errors).length ? (
          <div className="bg-destructive text-destructive-foreground px-3 py-2 rounded-md mt-4 flex items-center gap-2">
            <TriangleAlert className="w-4 h-4" />
            <div className="flex-1">
              <p className="text-sm">
                {firstError?.message ?? "Form is invalid"}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-end mt-4 gap-2">
          {props.stepIndex > 0 ? (
            <Button
              className={cn("btn-secondary", "hover:btn-secondary/80")}
              variant="ghost"
              type="button"
              onClick={props.onBack}
            >
              Back
            </Button>
          ) : (
            <></>
          )}
          <Button
            className={cn("bg-primary text-primary-foreground")}
            type="submit"
          >
            {props.submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepForm;
