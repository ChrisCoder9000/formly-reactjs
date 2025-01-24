// File: /utils/data.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 8:17:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { FieldType } from "../constants/enums";
import { Field } from "../constants/types";
import { ZodRawShape, z } from "zod";

export const toZod = (fields: Field[]): ZodRawShape => {
  const shape: ZodRawShape = {};

  fields.forEach((field) => {
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
      schema = z.array(z.string(), { required_error: requiredError });
      schema = isRequired ? schema : schema.optional();
    } else if (field.type === FieldType.MULTI_CHOICE) {
      schema = z.array(z.string(), { required_error: requiredError });
      schema = isRequired ? schema : schema.optional();
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
    } else {
      schema = isRequired
        ? z.string({ required_error: requiredError })
        : z.string().optional();
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
      });
    }

    shape[field.name] = schema;
  });

  return shape;
};
