import { FormStep } from "@/constants/types";
type StepFormProps = {
    step: FormStep;
    formTitle?: string;
    formSubtitle?: string;
    onSubmit: (data: Record<string, string>) => void;
    submitLabel?: string;
    stepIndex: number;
    stepsLength: number;
    onBack?: () => void;
};
declare const StepForm: (props: StepFormProps) => import("react/jsx-runtime").JSX.Element;
export default StepForm;
