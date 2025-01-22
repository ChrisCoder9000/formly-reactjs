import { FormStep } from "@/constants/types";
type BuilderProps = {
    steps: FormStep[];
    title?: string;
    description?: string;
    className?: string;
    nextLabel?: string;
    submitLabel?: string;
};
declare const Builder: (props: BuilderProps) => import("react/jsx-runtime").JSX.Element;
export default Builder;
