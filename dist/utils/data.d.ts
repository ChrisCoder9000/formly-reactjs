import { FieldType } from "../constants/enums";
import { Field, FormStepFlex } from "../constants/types";
import { ZodRawShape } from "zod";
export declare const toZod: (fields: Field[], formValues?: any) => ZodRawShape;
export declare const getNestedValue: (path: string, value: any, type?: FieldType) => any;
export declare const fillNestedField: (name: string, value: any, formData: Record<string, string> | undefined) => any;
export declare const findDependencyValue: (formValues: any, dependencyName: string) => any;
export declare const areDependenciesSatisfied: (dependencies: Field["dependencies"], formValues: any) => boolean;
export declare const fillInitialFormData: (formData: Record<string, string> | undefined, fields: FormStepFlex[]) => {
    [key: string]: string;
};
