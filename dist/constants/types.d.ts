import { FieldType } from "./enums";
export type FieldValidator = {
    name: string;
    errorMessage: string;
    value?: any;
};
export type FieldOption = {
    value: string;
    label: string;
};
export type Field = {
    name: string;
    type: FieldType;
    label?: string;
    description?: string;
    placeholder?: string;
    options?: FieldOption[];
    validators?: FieldValidator[];
};
export type FormStep = {
    title?: string;
    subtitle?: string;
    fields: Field[];
};
export type Form = {
    title?: string;
    description?: string;
    steps: FormStep[];
};
