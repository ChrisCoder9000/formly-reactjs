// File: /components/(Fields)/SelectField/SelectField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 1:43:49 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React, { useCallback, useEffect, useState, useRef } from "react";
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
  const [internalValue, setInternalValue] = useState(props.value);
  const isUserChange = useRef(false);

  useEffect(() => {
    if (!isUserChange.current) {
      setInternalValue(props.value);
    }
  }, [props.value, isUserChange]);

  if (!props.options) {
    throw new Error(`Select field ${props.name} must have options`);
  }

  const handleChange = useCallback(
    (value: string) => {
      if (isUserChange.current) {
        setInternalValue(value);
        props.onChange(props.name, value);
        isUserChange.current = false;
      }
    },
    [props.name, props.onChange]
  );

  const handleOpenChange = (open: boolean) => {
    if (open) {
      isUserChange.current = true;
    }
  };

  return (
    <Select
      value={internalValue}
      onOpenChange={handleOpenChange}
      onValueChange={handleChange}
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
