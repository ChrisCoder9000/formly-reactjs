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
const zod_1 = require("zod");
const toZod = (fields) => {
    const shape = {};
    fields.forEach((field) => {
        var _a, _b, _c, _d, _e;
        let schema = zod_1.z.string();
        let requiredError = {
            required_error: `${field.label || field.name.split("_").join(" ")} is required`,
        };
        if ((_a = field.validators) === null || _a === void 0 ? void 0 : _a.some((v) => v.name === "required")) {
            requiredError.required_error =
                (_d = (_c = (_b = field.validators) === null || _b === void 0 ? void 0 : _b.find((v) => v.name === "required")) === null || _c === void 0 ? void 0 : _c.errorMessage) !== null && _d !== void 0 ? _d : requiredError.required_error;
        }
        switch (field.type) {
            case "text":
                schema = zod_1.z.string(requiredError);
                break;
        }
        if (field.validators) {
            field.validators.forEach((validator) => {
                switch (validator.name) {
                    case "minLength":
                        schema = schema.min(validator.value, validator.errorMessage);
                        break;
                    case "maxLength":
                        schema = schema.max(validator.value, validator.errorMessage);
                        break;
                }
            });
        }
        if (!((_e = field.validators) === null || _e === void 0 ? void 0 : _e.some((v) => v.name === "required"))) {
            schema = schema.optional();
        }
        shape[field.name] = schema;
    });
    return shape;
};
exports.toZod = toZod;
