// File: /components/(Fields)/SelectField/SelectField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 1:43:49 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { FieldError } from "react-hook-form";

type SelectFieldProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
  name: string;
  errored?: FieldError;
};

const SelectField = (props: SelectFieldProps) => {
  if (!props.options) {
    throw new Error(`Select field ${props.name} must have options`);
  }
  return (
    <Select
      value={props.value}
      onValueChange={(value) => props.onChange(props.name, value)}
    >
      <SelectTrigger
        className={`w-full ${props.errored ? "border-red-500 bg-red-50" : ""}`}
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
};

export default SelectField;
