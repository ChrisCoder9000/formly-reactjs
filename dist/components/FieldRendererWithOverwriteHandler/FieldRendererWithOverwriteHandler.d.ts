import { FieldRendererProps } from "../FieldRenderer";
import { FieldComponentOverrides } from "../../constants/types";
type FieldRendererWithOverwriteHandlerProps = Omit<FieldRendererProps, "onChange"> & {
    fieldOverwrites?: Partial<FieldComponentOverrides>;
    formData: Record<string, any>;
    stepIndex: number;
};
declare const FieldRendererWithOverwriteHandler: (props: FieldRendererWithOverwriteHandlerProps) => import("react/jsx-runtime").JSX.Element;
export default FieldRendererWithOverwriteHandler;
