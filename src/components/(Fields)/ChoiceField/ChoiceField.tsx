// File: /components/(Fields)/ChoiceField/ChoiceField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 4:03:20 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import { cn } from "../../../lib/utils";
import { FieldType } from "../../../constants/enums";
import { FieldError } from "react-hook-form";

type MultipleChoiceFieldProps = {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (name: string, value: string[]) => void;
  name: string;
  type: FieldType.MULTI_CHOICE;
  errored?: FieldError;
};

type SingleChoiceFieldProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  type: FieldType.CHOICE;
  errored?: FieldError;
};

const ChoiceField = <T extends FieldType.CHOICE | FieldType.MULTI_CHOICE>(
  props: T extends FieldType.CHOICE
    ? SingleChoiceFieldProps
    : MultipleChoiceFieldProps
) => {
  const checkValue = (option: { label: string; value: string }) => {
    if (props.type === FieldType.CHOICE) {
      return props.value === option.value;
    } else {
      return props.value?.includes(option.value);
    }
  };
  return (
    <div className="flex flex-col gap-2 !mb-4">
      {props.options?.map((option, i) => (
        <div
          key={option.value}
          className={cn(
            `flex items-center gap-2 border py-2 px-4 rounded-md hover:${
              props.errored ? "bg-destructive/5" : "bg-primary/10"
            } cursor-pointer`,
            props.errored ? "border-destructive/10" : "",
            props.errored ? "bg-destructive/5" : "",
            checkValue(option)
              ? props.errored
                ? "bg-destructive/20"
                : "bg-primary/10"
              : ""
          )}
          onClick={() => {
            if (props.type === FieldType.MULTI_CHOICE) {
              const multiValue = (props.value as string[]) ?? [];
              if (multiValue.includes(option.value)) {
                (props.onChange as (name: string, value: string[]) => void)(
                  props.name,
                  multiValue.filter((v) => v !== option.value)
                );
              } else {
                (props.onChange as (name: string, value: string[]) => void)(
                  props.name,
                  [...multiValue, option.value]
                );
              }
            } else {
              if (props.value === option.value) {
                (props.onChange as (name: string, value: string) => void)(
                  props.name,
                  ""
                );
              } else {
                (props.onChange as (name: string, value: string) => void)(
                  props.name,
                  option.value
                );
              }
            }
          }}
        >
          <span
            className={cn(
              `border rounded-md px-2 py-1 text-sm text-center`,
              props.errored ? "text-destructive" : "",
              checkValue(option)
                ? props.errored
                  ? "border-destructive/20"
                  : "border-primary/20"
                : props.errored
                ? "border-destructive/20"
                : "border-primary/20"
            )}
          >
            {String.fromCharCode(97 + i).toUpperCase()}
          </span>
          <p className={`${props.errored ? "text-destructive" : ""} text-sm`}>
            {option.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChoiceField;
