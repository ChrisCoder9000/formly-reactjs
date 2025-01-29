import { FieldError } from "react-hook-form";
type OtpFieldProps = {
    value: string;
    onChange: (name: string, value: string) => void;
    errored?: FieldError;
    name: string;
};
declare const OtpField: (props: OtpFieldProps) => import("react/jsx-runtime").JSX.Element;
export default OtpField;
