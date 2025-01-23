import { FieldType } from "../../../constants/enums";
import { FieldError } from "react-hook-form";
type MultipleChoiceFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string[];
    onChange: (name: string, value: string[]) => void;
    name: string;
    type: FieldType.MULTI_CHOICE;
    errored?: FieldError;
};
type SingleChoiceFieldProps = {
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (name: string, value: string) => void;
    name: string;
    type: FieldType.CHOICE;
    errored?: FieldError;
};
declare const ChoiceField: <T extends FieldType.CHOICE | FieldType.MULTI_CHOICE>(props: T extends FieldType.CHOICE ? SingleChoiceFieldProps : MultipleChoiceFieldProps) => import("react/jsx-runtime").JSX.Element;
export default ChoiceField;
