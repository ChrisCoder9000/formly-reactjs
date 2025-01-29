import { FieldType, FieldTypeFlex } from "./enums";
import { FieldError } from "react-hook-form";
import { TW_COLORS } from "./colors";
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
export type FieldFormOverridesBase = {
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
export type FieldFormOverridesBlock = FieldFormOverridesBase & {
    onAddBlock: () => void;
    onRemoveBlock: (index: number) => void;
    onValueChange: (blockIndex: number, name: any, value: any) => void;
    blocks: {
        fields: (Field & {
            value: any;
            defaultComponent: React.ReactNode;
        })[];
    }[];
};
export type FormFieldOverrides<T extends FieldType> = T extends FieldType.BLOCKS ? FieldFormOverridesBlock : FieldFormOverridesBase;
export type FieldComponentOverrides = {
    [K in FieldType]: K extends FieldType.BLOCKS ? (args: FieldFormOverridesBlock) => JSX.Element : (args: FieldFormOverridesBase) => JSX.Element;
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
export type FieldOverwriteOnChangeProps<T extends FieldType> = T extends keyof FieldOverwriteOnChangePropsMap ? FieldOverwriteOnChangePropsMap[T] : never;
export type ColorsOverwrites = {
    background?: TW_COLORS;
    backgroundSecondary?: TW_COLORS;
    text?: TW_COLORS;
    textSecondary?: TW_COLORS;
    error?: TW_COLORS;
    buttons?: {
        primary?: TW_COLORS;
        secondary?: TW_COLORS;
    };
    ring?: TW_COLORS;
};
export {};
