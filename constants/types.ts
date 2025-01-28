// File: /constants/types.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:31:43 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FieldRendererProps } from "@/components/FieldRenderer/FieldRenderer";
import { FieldType, FieldTypeFlex } from "./enums";
import { FieldError } from "react-hook-form";

export type FieldValidator = {
  name: string;
  errorMessage?: string;
  value?: any;
};

export type FieldOption = {
  value: string;
  label: string;
};

export type FieldDependency = {
  name: string;
  value: any;
};

export type Field = {
  name: string;
  type: FieldType;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: FieldOption[];
  validators?: FieldValidator[];
  dependencies?: FieldDependency[];
  fields?: Field[];
  addLabel?: string;
  openLabel?: string;
};

export type FieldFlex = Omit<Field, "type" | "fields"> & {
  type: FieldTypeFlex;
  fields?: FieldFlex[];
};

export type FormStep = {
  title?: string;
  subtitle?: string;
  fields: Field[];
};

export type FormStepFlex = Omit<FormStep, "fields"> & {
  fields: FieldFlex[];
};

export type Form = {
  title?: string;
  description?: string;
  steps: FormStep[];
};

export type FormFieldOverrides = {
  onChange: (value: any) => void;
  value: any;
  errored?: FieldError;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: FieldOption[];
  defaultComponent?: React.ReactNode;
  stepIndex?: number;
  name?: string;
};

type _FieldOverwriteOnChangePropsMap = {
  [FieldType.TEXT]: string;
  [FieldType.NUMBER]: number;
  [FieldType.DATE]: Date;
  [FieldType.PHONE]: {
    prefix: string;
    phoneNumber: string;
    countryCode: string;
  };
  [FieldType.DATE_RANGE]: {
    from: Date;
    to: Date;
  };
  [FieldType.MULTI_SELECT]: string[];
  [FieldType.MULTI_OPTION]: string[];
  [FieldType.MULTI_CHOICE]: string[];
  [FieldType.CHECKBOX]: boolean;
  [FieldType.BLOCKS]: {
    blocks?: [];
    fields?: [];
    blockIndex?: number;
    name?: number;
  };
};

type FieldOverwriteOnChangePropsMap = _FieldOverwriteOnChangePropsMap;

export type FieldOverwriteOnChangeProps<T extends FieldType> =
  T extends keyof FieldOverwriteOnChangePropsMap
    ? FieldOverwriteOnChangePropsMap[T]
    : never;
