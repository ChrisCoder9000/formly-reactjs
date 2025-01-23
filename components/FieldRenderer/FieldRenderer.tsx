// File: /components/FieldRenderer/FieldRenderer.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:53:55 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { Field } from "@/constants/types";
import React from "react";
import { Input } from "../ui/input";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldError, useForm, UseFormReturn } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldType } from "@/constants/enums";
import DateField from "../(Fields)/DateField";
import SelectField from "../(Fields)/SelectField/SelectField";
import TextField from "../(Fields)/TextField";

export type FieldRendererProps = {
  field: Field;
  errored?: FieldError;
  onChange: (name: string, value: string) => void;
  value?: any;
  form: UseFormReturn;
};

const FieldRenderer = (props: FieldRendererProps) => {
  return (
    <FormField
      name={props.field.name}
      control={props.form.control}
      render={(args) => {
        return (
          <FormItem className="flex flex-col gap-1">
            {props.field.label ? (
              <FormLabel htmlFor={args.field.name}>
                {props.field.label}
              </FormLabel>
            ) : (
              <></>
            )}
            <FieldSwitcher
              {...props.field}
              value={args.field.value ?? props.value}
              errored={props.errored}
              onChange={props.onChange}
            />
            <FormDescription className={props.errored ? "text-red-500" : ""}>
              {props.field.description}
            </FormDescription>
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
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
          errored={props.errored}
        />
      );
    case "otp":
      return <></>;
    case "text_area":
      return (
        <Textarea
          value={props.value ?? ""}
          className={props.errored ? "border-red-500 bg-red-50" : ""}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.name, e.target.value)}
        />
      );
    case "select":
      return (
        <SelectField
          options={props.options ?? []}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          errored={props.errored}
        />
      );
    case "date":
    case "date_range":
      return (
        <DateField
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          errored={props.errored}
          type={props.type}
        />
      );
    default:
      return (
        <div>
          <p>Unknown field type</p>
        </div>
      );
  }
};

export default FieldRenderer;
