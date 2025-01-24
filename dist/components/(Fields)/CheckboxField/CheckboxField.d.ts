import { FieldError } from "react-hook-form";
type CheckboxFieldProps = {
    value: boolean;
    onChange: (name: string, value: boolean) => void;
    name: string;
    errored?: FieldError;
    label: string;
    description?: string;
};
declare const CheckboxField: (props: CheckboxFieldProps) => import("react/jsx-runtime").JSX.Element;
export default CheckboxField;
