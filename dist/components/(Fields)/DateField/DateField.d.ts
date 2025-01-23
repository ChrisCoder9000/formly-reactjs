import { FieldType } from "../../../constants/enums";
import { FieldError } from "react-hook-form";
type DateFieldProps = {
    type: FieldType.DATE | FieldType.DATE_RANGE | FieldType.DATE_TIME | FieldType.TIME;
    value: any;
    onChange: (name: string, value: any) => void;
    name: string;
    errored: FieldError | undefined;
};
declare const DateField: (props: DateFieldProps) => import("react/jsx-runtime").JSX.Element;
export default DateField;
