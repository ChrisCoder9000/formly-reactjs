import { Field } from "@/constants/types";
import { FieldError } from "react-hook-form";
type FieldRendererProps = {
    field: Field;
    errored?: FieldError;
    onChange: (name: string, value: string) => void;
};
declare const FieldRenderer: (props: FieldRendererProps) => import("react/jsx-runtime").JSX.Element;
export default FieldRenderer;
