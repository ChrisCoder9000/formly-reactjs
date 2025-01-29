import { FieldError } from "react-hook-form";
import { ColorsOverwrites } from "../../../constants/types";
type SelectFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (name: string, value: string) => void;
    name: string;
    errored?: FieldError;
    colors?: ColorsOverwrites;
};
declare const SelectField: (props: SelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export default SelectField;
