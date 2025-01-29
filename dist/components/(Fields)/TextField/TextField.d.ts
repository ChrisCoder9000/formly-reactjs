import { FieldType } from "../../../constants/enums";
import { FieldError } from "react-hook-form";
import { ColorsOverwrites } from "../../../constants/types";
type PhoneNumber = {
    countryCode: string;
    phoneNumber: string;
    prefix: string;
};
type TextFieldProps = {
    type: FieldType.EMAIL | FieldType.NUMBER | FieldType.TEXT | FieldType.URL | FieldType.SECRET | FieldType.PHONE;
    value: string;
    placeholder?: string;
    onChange: (name: string, value: string | PhoneNumber) => void;
    name: string;
    errored?: FieldError;
    colors?: ColorsOverwrites;
};
declare const TextField: (props: TextFieldProps) => import("react/jsx-runtime").JSX.Element;
export default TextField;
