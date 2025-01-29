import { FormStep, FieldComponentOverrides, ColorsOverwrites } from "../../constants/types";
import React from "react";
import { FieldErrors } from "react-hook-form";
type StepFormProps = {
    step: FormStep;
    formTitle?: string;
    formSubtitle?: string;
    onSubmit: (data: Record<string, string>) => void;
    submitLabel?: string;
    stepIndex: number;
    stepsLength: number;
    onBack?: () => void;
    formData?: Record<string, string>;
    fieldOverwrites?: Partial<FieldComponentOverrides>;
    color?: ColorsOverwrites;
    headerOverwrites?: (props: {
        title: string | undefined;
        subtitle: string | undefined;
    }) => React.ReactElement;
    actionsOverwrites?: (props: {
        onBack: () => void;
        onSubmit: () => void;
    }) => React.ReactElement;
    formErrorOverwrites?: (props: {
        errors: FieldErrors<{
            [x: string]: any;
        }>;
    }) => React.ReactElement;
    onStepSubmit?: (args: {
        data: Record<string, string>;
        stepIndex: number;
        errors: FieldErrors<{
            [x: string]: any;
        }>;
    }) => void;
};
declare const StepForm: (props: StepFormProps) => import("react/jsx-runtime").JSX.Element;
export default StepForm;
