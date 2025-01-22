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
      return (
        <Input
          type={props.type}
          value={props.value ?? ""}
          className={props.errored ? "border-red-500 bg-red-50" : ""}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.name, e.target.value)}
        />
      );
    case "secret":
      return <></>;
    case "phone":
      return <></>;
    case "text_area":
      return (
        <Textarea
          value={props.value}
          className={props.errored ? "border-red-500 bg-red-50" : ""}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.name, e.target.value)}
        />
      );
    case "select":
      if (!props.options) {
        throw new Error(`Select field ${props.name} must have options`);
      }
      return (
        <Select
          value={props.value}
          onValueChange={(value) => props.onChange(props.name, value)}
        >
          <SelectTrigger
            className={`w-full ${
              props.errored ? "border-red-500 bg-red-50" : ""
            }`}
          >
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {props.options.map((option, i) => (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "date":
    case "date_range":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !props.value && "text-muted-foreground",
                props.errored && "border-red-500 bg-red-50 text-red-500"
              )}
            >
              <CalendarIcon />
              {props.value ? (
                format(props.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={
                props.type === FieldType.DATE
                  ? "single"
                  : props.type === FieldType.DATE_RANGE
                  ? "range"
                  : "single"
              }
              selected={props.value}
              onSelect={(date: any) => date && props.onChange(props.name, date)}
            />
          </PopoverContent>
        </Popover>
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
