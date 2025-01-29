import { FieldRendererProps } from "../FieldRenderer";
import { FieldComponentOverrides, ColorsOverwrites } from "../../constants/types";
type FieldRendererWithOverwriteHandlerProps = Omit<FieldRendererProps, "onChange"> & {
    fieldOverwrites?: Partial<FieldComponentOverrides>;
    formData: Record<string, any>;
    stepIndex: number;
    colors?: ColorsOverwrites;
};
declare const FieldRendererWithOverwriteHandler: (props: FieldRendererWithOverwriteHandlerProps) => import("react/jsx-runtime").JSX.Element;
export default FieldRendererWithOverwriteHandler;
