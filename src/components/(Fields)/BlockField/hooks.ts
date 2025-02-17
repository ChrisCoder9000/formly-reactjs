// File: /components/(Fields)/BlockField/hooks.ts
// Created Date: Tuesday January 28th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Tuesday January 28th 2025 5:34:00 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { useEffect, useState } from "react";
import { Field } from "../../../constants/types";
import { getNestedValue } from "../../../utils/data";

type UseBlocksFieldProps = {
  fields: Field[];
  value: Record<string, any>[];
  isBlock?: boolean;
};

// TODO: improve, I was tired :')
export const useBlocksField = (args: UseBlocksFieldProps) => {
  const [blocks, setBlocks] = useState<any[]>([{ fields: args.fields ?? [] }]);
  const [openedBlockIndex, setOpenedBlockIndex] = useState<number>(0);

  useEffect(() => {
    setBlocks(
      Array.from({ length: args.value?.length || 1 }, (_, i) => ({
        fields: args.fields.map((field) => ({
          ...field,
          value: getNestedValue(field.name, args.value, field.type),
        })),
      }))
    );
  }, [args.value]);

  return {
    blocks,
    setBlocks,
    openedBlockIndex,
    setOpenedBlockIndex,
  };
};
