// File: /components/(Fields)/OptionField/OptionField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 5:09:35 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import { cn } from "../../../lib/utils";
import { FieldType } from "../../../constants/enums";
import { colorBuilder } from "../../../utils/colors";
import { FieldError } from "react-hook-form";

type MultipleOptionFieldProps = {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (name: string, value: string[]) => void;
  name: string;
  type: FieldType.MULTI_OPTION;
  errored?: FieldError;
};

type SingleOptionFieldProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  type: FieldType.OPTION;
  errored?: FieldError;
};

const OptionField = <T extends FieldType.OPTION | FieldType.MULTI_OPTION>(
  props: T extends FieldType.OPTION
    ? SingleOptionFieldProps
    : MultipleOptionFieldProps
) => {
  const checkValue = (option: { label: string; value: string }) => {
    if (props.type === FieldType.MULTI_OPTION) {
      return props.value?.includes(option.value);
    } else {
      return props.value === option.value;
    }
  };
  return (
    <div className="flex flex-row gap-2 flex-wrap !mb-4">
      {props.options?.map((option) => (
        <div
          key={option.value}
          className={cn(
            `flex items-center gap-2 ${colorBuilder(
              "bg",
              props.errored ? "red" : "slate",
              "100"
            )} border py-2 px-4 rounded-md w-fit cursor-pointer`,
            checkValue(option)
              ? colorBuilder("bg", props.errored ? "red" : "slate", "300")
              : colorBuilder("bg", props.errored ? "red" : "slate", "100")
          )}
          onClick={() => {
            if (props.type === FieldType.MULTI_OPTION) {
              const multiValue = (props.value as string[]) ?? [];
              if (multiValue?.includes(option.value)) {
                props.onChange(
                  props.name,
                  multiValue.filter((v) => v !== option.value)
                );
              } else {
                props.onChange(props.name, [
                  ...(props.value ?? []),
                  option.value,
                ]);
              }
            } else {
              if (props.value === option.value) {
                props.onChange(props.name, "");
              } else {
                props.onChange(props.name, option.value);
              }
            }
          }}
        >
          <p
            className={`${colorBuilder(
              "text",
              props.errored ? "red" : "slate",
              "600"
            )} text-sm`}
          >
            {option.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OptionField;
