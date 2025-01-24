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
export type FieldDependency = {
    name: string;
    value: string;
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
