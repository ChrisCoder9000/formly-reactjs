import { Field } from "../../../constants/types";
type UseBlocksFieldProps = {
    fields: Field[];
    value: Record<string, any>[];
    isBlock?: boolean;
};
export declare const useBlocksField: (args: UseBlocksFieldProps) => {
    blocks: any[];
    setBlocks: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    openedBlockIndex: number;
    setOpenedBlockIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
};
export {};
