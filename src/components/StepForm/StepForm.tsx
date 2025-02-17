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
import React, { useMemo, useEffect, useCallback } from "react";
import StepHeader from "../StepHeader/StepHeader";
import { Form } from "../ui/form";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { fillNestedField, getNestedValue, toZod } from "../../utils/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, TriangleAlert } from "lucide-react";
import { FieldType } from "../../constants/enums";
import FieldRendererWithOverwriteHandler from "../FieldRendererWithOverwriteHandler";
import { TW_COLORS } from "../../constants/colors";
import { cn } from "../../lib/utils";

type StepFormProps = {
  step: FormStep;
  formTitle?: string;
  formSubtitle?: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  stepIndex: number;
  stepsLength: number;
  onBack?: () => void;
  formData?: Record<string, any>;
  fieldOverwrites?: Partial<FieldComponentOverrides>;
  headerOverwrites?: (props: {
    title: string | undefined;
    subtitle: string | undefined;
  }) => React.ReactElement;
  actionsOverwrites?: (props: {
    onBack: () => void;
    onSubmit: () => Promise<void>;
    isButtonLoading?: boolean;
  }) => React.ReactElement;
  formErrorOverwrites?: (props: {
    errors: FieldErrors<{ [x: string]: any }>;
  }) => React.ReactElement;
  onStepSubmit?: (args: {
    data: Record<string, string>;
    stepIndex: number;
    errors: FieldErrors<{ [x: string]: any }>;
  }) => Promise<void>;
  onChange?: (data: Record<string, string>, stepIndex: number) => void;
  stepFormData?: Record<string, any>;
  isButtonLoading?: boolean;
};

const StepForm = React.memo((props: StepFormProps) => {
  const formRef = React.useRef<any>();
  const [isStepSubmitting, setIsStepSubmitting] = React.useState(false);

  // Memoize the form schema
  const formSchema = useMemo(
    () => z.object(toZod(props.step.fields)),
    [props.step.fields]
  );

  // Memoize the form instance
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: async (values, context, options) => {
      const schema = z.object(
        toZod(props.step.fields, formRef.current?.getValues())
      );
      return zodResolver(schema)(values, context, options);
    },
    mode: "onChange",
    // defaultValues: props.formData, // Set default values here
  });

  formRef.current = form;

  // Update form values when formData changes
  useEffect(() => {
    if (props.stepFormData) {
      // Use setValue instead of reset to preserve form state
      Object.entries(props.stepFormData).forEach(([key, value]) => {
        form.setValue(key, value, {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        });
      });
    }
  }, [props.stepFormData, form]);

  const handleSubmit = useCallback(async () => {
    await props.onSubmit(form.getValues());
  }, [form, props.onSubmit]);

  const handleStepSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const onValid = async () => {
        setIsStepSubmitting(true);
        try {
          await props.onStepSubmit?.({
            data: form.getValues(),
            stepIndex: props.stepIndex,
            errors: form.formState.errors,
          });
          await handleSubmit();
          form.reset();
        } catch (error) {
          console.error(error);
        }
      };

      const onInvalid = async () => {
        try {
          await props.onStepSubmit?.({
            data: form.getValues(),
            stepIndex: props.stepIndex,
            errors: form.formState.errors,
          });
        } catch (error) {
          console.error(error);
        }
      };

      await form.handleSubmit(onValid, onInvalid)(e);
      setIsStepSubmitting(false);
    },
    [form, props.onStepSubmit, props.stepIndex, handleSubmit]
  );

  const handleBack = useCallback(() => {
    form.reset();
    props.onBack?.();
  }, [form, props.onBack]);

  // Memoize form watch subscription
  useEffect(() => {
    if (!props.onChange) return;
    const subscription = form.watch((data) => {
      props.onChange?.(data || {}, props.stepIndex);
    });

    return () => subscription.unsubscribe();
  }, [form, props.onChange, props.stepIndex]);

  // Memoize the first error computation
  const firstError = useMemo(() => {
    let error = Object.values(form.formState.errors)[0] as FieldError;
    if (Array.isArray(error)) {
      error = Object.values(Object.entries(error)[0][1])[0] as FieldError;
    }
    return error;
  }, [form.formState.errors]);

  // Memoize fields rendering
  const renderFields = useMemo(
    () =>
      props.step.fields.map((_field: any, i) => {
        const field = _field as Omit<Field, "type"> & { type: FieldType };

        return (
          <FieldRendererWithOverwriteHandler
            key={i}
            field={field}
            fieldOverwrites={props.fieldOverwrites}
            formValues={form.getValues()}
            formData={props.formData ?? {}}
            // formData={props.formData ?? form.getValues()}
            stepIndex={props.stepIndex}
            form={form}
            value={form.getValues()?.[field.name]}
          />
        );
      }),
    [props.step.fields, props.fieldOverwrites, props.stepIndex, form]
  );

  // Update the button loading condition
  const isLoading = props.isButtonLoading || isStepSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={handleStepSubmit}>
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
        <div className="flex flex-col gap-4">{renderFields}</div>
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
        ) : null}
        {props.actionsOverwrites ? (
          props.actionsOverwrites({
            onBack: props.onBack ?? (() => {}),
            onSubmit: handleSubmit,
            isButtonLoading: props.isButtonLoading,
          })
        ) : (
          <div className="flex justify-end mt-4 gap-2">
            {props.stepIndex > 0 && (
              <Button
                className={cn("btn-secondary", "hover:btn-secondary/80")}
                variant="ghost"
                type="button"
                onClick={handleBack}
                disabled={props.isButtonLoading}
              >
                Back
              </Button>
            )}
            <Button
              className={cn(
                "bg-primary text-primary-foreground",
                "flex items-center gap-2"
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className={cn("text-secondary", "animate-spin-slow")} />
              ) : (
                <></>
              )}
              {props.submitLabel}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
});

StepForm.displayName = "StepForm";

export default StepForm;
