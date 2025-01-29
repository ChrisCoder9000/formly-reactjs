// File: /components/(Fields)/CheckboxField/CheckboxField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 10:38:09 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FieldError } from "react-hook-form";
import { Checkbox } from "../../../components/ui/checkbox";
import React from "react";
import { cn } from "../../../lib/utils";

type CheckboxFieldProps = {
  value: boolean;
  onChange: (name: string, value: boolean) => void;
  name: string;
  errored?: FieldError;
  label: string;
  description?: string;
};

const CheckboxField = (props: CheckboxFieldProps) => {
  if (!props.label) {
    throw new Error("Label is required for CheckboxField");
  }
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        className={cn(
          "cursor-pointer",
          props.errored ? "border-red-500 bg-red-50 text-red-500" : ""
        )}
        id={props.name}
        checked={props.value}
        onCheckedChange={(checked) =>
          props.onChange(props.name, checked as boolean)
        }
      />
      <div className="grid gap-1.5 leading-none cursor-pointer">
        <label
          htmlFor={props.name}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            props.errored ? "text-red-500" : ""
          )}
        >
          {props.label}
        </label>
        {props.description ? (
          <p
            className={cn(
              "text-[0.8rem] text-muted-foreground",
              props.errored ? "text-red-100" : ""
            )}
          >
            {props.description}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CheckboxField;
