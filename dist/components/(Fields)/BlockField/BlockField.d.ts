import { FieldError, UseFormReturn } from "react-hook-form";
import { Field } from "@/constants/types";
type BlockFieldProps = {
    value: any;
    onChange: (name: string, value: object) => void;
    name: string;
    errored: FieldError | undefined;
    field: Field;
    form: UseFormReturn;
};
declare const BlockField: (props: BlockFieldProps) => import("react/jsx-runtime").JSX.Element;
export default BlockField;
