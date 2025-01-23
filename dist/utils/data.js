"use strict";
// File: /utils/data.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 8:17:53 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----
Object.defineProperty(exports, "__esModule", { value: true });
exports.toZod = void 0;
const enums_1 = require("@/constants/enums");
const zod_1 = require("zod");
const toZod = (fields) => {
    const shape = {};
    fields.forEach((field) => {
        var _a, _b, _c, _d;
        let schema;
        const requiredError = (_c = (_b = (_a = field.validators) === null || _a === void 0 ? void 0 : _a.find((v) => v.name === "required")) === null || _b === void 0 ? void 0 : _b.errorMessage) !== null && _c !== void 0 ? _c : `${field.label || field.name.split("_").join(" ")} is required`;
        const isRequired = (_d = field.validators) === null || _d === void 0 ? void 0 : _d.some((v) => v.name === "required");
        if (field.type === enums_1.FieldType.DATE) {
            schema = zod_1.z
                .date()
                .transform((val) => new Date(val))
                .refine((date) => !isNaN(date.getTime()), {
                message: "Invalid date format",
            });
            schema = isRequired ? schema : schema.optional();
        }
        else if (field.type === enums_1.FieldType.NUMBER) {
            schema = zod_1.z
                .string()
                .transform((val) => Number(val))
                .refine((num) => !isNaN(num), {
                message: "Invalid number format",
            });
            schema = isRequired ? schema : schema.optional();
        }
        else if (field.type === enums_1.FieldType.EMAIL) {
            schema = zod_1.z.string().email();
            schema = isRequired ? schema : schema.optional();
        }
        else if (field.type === enums_1.FieldType.URL) {
            schema = zod_1.z.string().url();
            schema = isRequired ? schema : schema.optional();
        }
        else {
            schema = isRequired
                ? zod_1.z.string({ required_error: requiredError })
                : zod_1.z.string().optional();
        }
        if (field.validators) {
            field.validators.forEach((validator) => {
                if (validator.name === "minLength") {
                    schema = schema.refine((val) => !val || val.length >= validator.value, { message: validator.errorMessage });
                }
                if (validator.name === "maxLength") {
                    schema = schema.refine((val) => !val || val.length <= validator.value, { message: validator.errorMessage });
                }
            });
        }
        shape[field.name] = schema;
    });
    return shape;
};
exports.toZod = toZod;
