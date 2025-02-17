// Created Date: Thursday January 30th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 30th 2025 2:49:47 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { ColorsOverwrites, Field } from "../../../constants/types";
import { cn } from "../../../lib/utils";
import { FormDescription, FormField, FormItem, FormLabel } from "../../ui/form";
import { FieldType } from "../../../constants/enums";
import { areDependenciesSatisfied } from "../../../utils/data";
import { Textarea } from "../../ui/textarea";
import DateField from "../DateField";
import SelectField from "../SelectField/SelectField";
import TextField from "../TextField";
import ChoiceField from "../ChoiceField/ChoiceField";
import OptionField from "../OptionField/OptionField";
import CheckboxField from "../CheckboxField/CheckboxField";
import { OtpField } from "../OtpField";

type BlockFieldRendererProps = {
  field: Field;
  errored?: FieldError;
  onChange: (name: string, value: string) => void;
  value?: any;
  form: UseFormReturn;
  colors?: ColorsOverwrites;
  formData?: Record<string, any>;
};

const BlockFieldRenderer = (props: BlockFieldRendererProps) => {
  if (props.field.dependencies?.length) {
    if (!areDependenciesSatisfied(props.field.dependencies, props.formData)) {
      return null;
    }
  }
  return (
    <FormField
      name={props.field.name}
      control={props.form.control}
      render={(args) => {
        return (
          <FormItem className="flex flex-col gap-1">
            {props.field.label &&
            ![FieldType.CHECKBOX].includes(props.field.type) ? (
              <FormLabel
                className={cn(props.errored ? "text-destructive" : "")}
                htmlFor={args.field.name}
              >
                {props.field.label}
                {props.field.validators?.some((v) => v.name === "required") ? (
                  <span className="text-destructive ml-1">*</span>
                ) : (
                  <></>
                )}
              </FormLabel>
            ) : (
              <></>
            )}
            {[
              FieldType.OPTION,
              FieldType.CHOICE,
              FieldType.MULTI_CHOICE,
              FieldType.MULTI_OPTION,
            ].includes(props.field.type) ? (
              <FormDescription
                className={cn(
                  props.errored ? "text-destructive/70" : "",
                  "!mt-0"
                )}
              >
                {props.field.description}
              </FormDescription>
            ) : (
              <></>
            )}
            <FieldSwitcher
              {...props.field}
              value={args.field.value ?? props.value}
              errored={props.errored}
              onChange={(name, value) => {
                props.onChange(name, value);
              }}
              field={props.field}
              form={props.form}
              colors={props.colors}
            />
            {![
              FieldType.OPTION,
              FieldType.CHOICE,
              FieldType.MULTI_CHOICE,
              FieldType.MULTI_OPTION,
              FieldType.CHECKBOX,
            ].includes(props.field.type) && props.field.description ? (
              <FormDescription
                className={cn(
                  props.errored ? "text-destructive/70" : "",
                  "!mt-1"
                )}
              >
                {props.field.description}
              </FormDescription>
            ) : (
              <></>
            )}
          </FormItem>
        );
      }}
    />
  );
};

const FieldSwitcher = (
  props: Field & {
    errored?: FieldError;
    onChange: (name: string, value: any) => void;
    value: any;
    field: Field;
    form: UseFormReturn;
    colors?: ColorsOverwrites;
  }
) => {
  switch (props.type) {
    case "text":
    case "number":
    case "email":
    case "url":
    case "secret":
    case "phone":
      return (
        <TextField
          type={props.type}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
          colors={props.colors}
        />
      );
    case "otp":
      return (
        <OtpField
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
        />
      );
    case "text_area":
      return (
        <Textarea
          value={props.value ?? ""}
          className={
            typeof props.errored === "object" && props.errored
              ? "border-destructive-foreground bg-destructive-foreground/10"
              : ""
          }
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.name, e.target.value)}
        />
      );
    case "select":
      return (
        <SelectField
          colors={props.colors}
          options={props.options ?? []}
          value={props.value ?? ""}
          onChange={props.onChange}
          name={props.name}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
        />
      );
    case "date":
    case "date_range":
      return (
        <DateField
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
          type={props.type}
        />
      );
    case "option":
    case "multi_option":
      return (
        <OptionField
          options={props.options ?? []}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          type={props.type}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
        />
      );
    case "choice":
    case "multi_choice":
      return (
        <ChoiceField
          options={props.options ?? []}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          type={props.type}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          errored={
            typeof props.errored === "object" ? props.errored : undefined
          }
          label={props.label ?? ""}
          description={props.description}
        />
      );
    default:
      return null;
  }
};

export default BlockFieldRenderer;
