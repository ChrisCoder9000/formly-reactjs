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
import { colorBuilder } from "../../../utils/colors";
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
            `flex items-center gap-2 border py-2 px-4 rounded-md hover:${colorBuilder(
              "bg",
              props.errored ? "red" : "gray",
              "300/30"
            )} cursor-pointer`,
            props.errored ? colorBuilder("border", "red", "100") : "",
            props.errored ? colorBuilder("bg", "red", "50") : "",
            checkValue(option)
              ? colorBuilder("bg", props.errored ? "red" : "gray", "400/20")
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
              `${colorBuilder(
                "text",
                props.errored ? "red" : "gray",
                "500"
              )} border rounded-md px-2 py-1 text-sm text-center`,
              checkValue(option)
                ? colorBuilder("border", props.errored ? "red" : "gray", "300")
                : colorBuilder("border", props.errored ? "red" : "gray", "200")
            )}
          >
            {String.fromCharCode(97 + i).toUpperCase()}
          </span>
          <p
            className={`${colorBuilder(
              "text",
              props.errored ? "red" : "gray",
              "500"
            )} text-sm`}
          >
            {option.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChoiceField;
