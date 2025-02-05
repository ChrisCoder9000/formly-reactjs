// File: /utils/data.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 8:17:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FieldType } from "../constants/enums";
import { Field, FormStep, FormStepFlex } from "../constants/types";
import { ZodRawShape, z } from "zod";
import { VALIDATORS } from "../constants/validators";

export const toZod = (fields: Field[], formValues: any = {}): ZodRawShape => {
  const shape: ZodRawShape = {};

  fields.forEach((field) => {
    if (
      field.dependencies &&
      !areDependenciesSatisfied(field.dependencies, formValues)
    ) {
      return;
    }

    let schema: z.ZodType<any>;
    const requiredError =
      field.validators?.find((v) => v.name === "required")?.errorMessage ??
      `${field.label || field.name?.split("_").join(" ")} is required`;
    const isRequired = field.validators?.some((v) => v.name === "required");

    if (field.type === FieldType.DATE) {
      schema = z
        .date({ required_error: requiredError })
        .transform((val) => new Date(val))
        .refine((date) => !isNaN(date.getTime()), {
          message: "Invalid date format",
        });
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.DATE_RANGE) {
      schema = z.object({
        from: z
          .date({ required_error: requiredError })
          .transform((val) => new Date(val))
          .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
          }),
        to: z
          .date({ required_error: requiredError })
          .transform((val) => new Date(val))
          .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
          }),
      });
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.NUMBER) {
      schema = z
        .string({ required_error: requiredError })
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num), {
          message: "Invalid number format",
        });
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.EMAIL) {
      schema = z.string({ required_error: requiredError }).email();
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.URL) {
      schema = z.string({ required_error: requiredError }).url();
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.MULTI_OPTION) {
      let arraySchema = z.array(z.string(), { required_error: requiredError });
      schema = isRequired
        ? arraySchema.min(1, { message: requiredError })
        : arraySchema.optional();
    } else if (field.type === FieldType.MULTI_CHOICE) {
      let arraySchema = z.array(z.string(), { required_error: requiredError });
      schema = isRequired
        ? arraySchema.min(1, { message: requiredError })
        : arraySchema.optional();
    } else if (field.type === FieldType.CHECKBOX) {
      schema = z.boolean({ required_error: requiredError });
      if (isRequired) {
        schema = schema.refine((val) => val === true, {
          message: requiredError,
        });
      } else {
        schema = schema.optional();
      }
    } else if (field.type === FieldType.PHONE) {
      schema = z.object({
        phoneNumber: z.string({ required_error: requiredError }),
        prefix: z.string({ required_error: requiredError }),
        countryCode: z.string({ required_error: requiredError }),
      });
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.BLOCKS) {
      const nestedSchema = field.fields ? toZod(field.fields, formValues) : {};
      schema = z
        .array(z.object(nestedSchema).strict())
        .min(isRequired ? 1 : 0, { message: requiredError })
        .transform((blocks) =>
          blocks.map((block) => {
            return Object.fromEntries(
              Object.entries(block).filter(
                ([_, v]) => v !== undefined && v !== ""
              )
            );
          })
        );
      schema = isRequired ? schema : schema.optional();
    } else {
      let stringSchema = z.string({ required_error: requiredError });
      if (isRequired) {
        schema = stringSchema.min(1, { message: requiredError });
      } else {
        schema = stringSchema.optional();
      }
    }

    if (field.validators) {
      field.validators.forEach((validator) => {
        if (validator.name === "minLength") {
          schema = schema.refine(
            (val) => !val || val.length >= validator.value,
            { message: validator.errorMessage }
          ) as unknown as z.ZodString;
        }
        if (validator.name === "maxLength") {
          schema = schema.refine(
            (val) => !val || val.length <= validator.value,
            { message: validator.errorMessage }
          ) as unknown as z.ZodString;
        }
        if (validator.name === "pattern") {
          schema = schema.refine(
            (val) => !val || VALIDATORS.pattern(validator.value, val),
            { message: validator.errorMessage }
          ) as unknown as z.ZodString;
        }
        if (validator.name === "custom") {
          schema = schema.refine(
            (val) => !val || VALIDATORS.custom(validator.value, val),
            { message: validator.errorMessage }
          ) as unknown as z.ZodString;
        }
      });
    }

    shape[field.name] = schema;
  });

  return shape;
};

export const getNestedValue = (path: string, value: any, type?: FieldType) => {
  if (!Object.entries(value).length) {
    return undefined;
  }
  if (!path.includes(".") && type && [FieldType.CHECKBOX].includes(type)) {
    return value;
  }

  const keys = path.split(".");
  let current = value;

  for (const key of keys) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[key];
  }

  return current;
};

export const fillNestedField = (
  name: string,
  value: any,
  formData: Record<string, string> | undefined
) => {
  const keys = name.split(".");

  if (keys.length === 1) {
    return { ...formData, [name]: value };
  }

  let result: any = [];
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = {};
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;

  const _formData = { ...formData, ...result };

  return _formData;
};

export const findDependencyValue = (
  formValues: any,
  dependencyName: string
): any => {
  if (formValues[dependencyName] !== undefined) {
    return formValues[dependencyName];
  }

  for (const key in formValues) {
    const value = formValues[key];

    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findDependencyValue(item, dependencyName);
        if (found !== undefined) return found;
      }
    } else if (typeof value === "object" && value !== null) {
      const found = findDependencyValue(value, dependencyName);
      if (found !== undefined) return found;
    }
  }

  return undefined;
};

export const areDependenciesSatisfied = (
  dependencies: Field["dependencies"],
  formValues: any
): boolean => {
  if (!dependencies?.length) return true;

  return dependencies.every((dependency) => {
    const dependencyValue = findDependencyValue(formValues, dependency.name);

    if (dependency.value) {
      if (Array.isArray(dependencyValue)) {
        return dependencyValue.includes(dependency.value);
      }

      // Convert both values to strings for comparison to handle different types
      return String(dependencyValue) === String(dependency.value);
    }

    // Handle different types of non-empty checks
    if (Array.isArray(dependencyValue)) {
      return dependencyValue.length > 0;
    }
    if (typeof dependencyValue === "string") {
      return dependencyValue.length > 0;
    }
    if (typeof dependencyValue === "number") {
      return true; // Any number is considered valid
    }
    if (typeof dependencyValue === "boolean") {
      return dependencyValue; // Only true is considered valid
    }

    return !!dependencyValue; // Handle other cases
  });
};

export const fillInitialFormData = (
  formData: Record<string, string> | undefined,
  fields: FormStepFlex[]
): { [key: string]: string } => {
  let _formData: { [key: string]: string } = {};

  if (!fields?.length || !Object.entries(formData ?? {}).length)
    return _formData;

  for (const [name, value] of Object.entries(formData ?? {})) {
    const field = fields.find((f) => f.fields.find((f) => f.name === name));
    if (field) {
      _formData[name] = value;
    }
  }

  return _formData;
};
