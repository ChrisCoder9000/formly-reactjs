import { FieldType } from "../../../constants/enums";
import { FieldError } from "react-hook-form";
type MultipleOptionFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string[];
    onChange: (name: string, value: string[]) => void;
    name: string;
    type: FieldType.MULTI_OPTION;
    errored?: FieldError;
};
type SingleOptionFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (name: string, value: string) => void;
    name: string;
    type: FieldType.OPTION;
    errored?: FieldError;
};
declare const OptionField: <T extends FieldType.OPTION | FieldType.MULTI_OPTION>(props: T extends FieldType.OPTION ? SingleOptionFieldProps : MultipleOptionFieldProps) => import("react/jsx-runtime").JSX.Element;
export default OptionField;
