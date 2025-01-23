import { Field } from "../../constants/types";
import { FieldError, UseFormReturn } from "react-hook-form";
export type FieldRendererProps = {
    field: Field;
    errored?: FieldError;
    onChange: (name: string, value: string) => void;
    value?: any;
    form: UseFormReturn;
};
declare const FieldRenderer: (props: FieldRendererProps) => import("react/jsx-runtime").JSX.Element;
export default FieldRenderer;
