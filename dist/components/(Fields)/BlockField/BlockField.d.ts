import { FieldError, UseFormReturn } from "react-hook-form";
import { ColorsOverwrites, Field } from "../../../constants/types";
type BlockFieldProps = {
    value: Record<string, any>[];
    onChange: (name: string, value: any) => void;
    name: string;
    errored: FieldError | Record<string, FieldError>[] | undefined;
    field: Field;
    form: UseFormReturn;
    colors?: ColorsOverwrites;
};
declare const BlocksField: (props: BlockFieldProps) => import("react/jsx-runtime").JSX.Element;
export default BlocksField;
