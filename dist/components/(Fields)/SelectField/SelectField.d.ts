import { FieldError } from "react-hook-form";
type SelectFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (name: string, value: string) => void;
    name: string;
    errored?: FieldError;
};
declare const SelectField: (props: SelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export default SelectField;
