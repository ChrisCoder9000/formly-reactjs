// File: /components/(Fields)/BlockField/BlockField.tsx
// Created Date: Friday January 24th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Friday January 24th 2025 5:42:36 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React, { useState } from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { Field } from "@/constants/types";
import FieldRenderer from "@/components/FieldRenderer";
import { FieldType } from "@/constants/enums";
import { PlusIcon } from "lucide-react";

type BlockFieldProps = {
  value: any;
  onChange: (name: string, value: object) => void;
  name: string;
  errored: FieldError | undefined;
  field: Field;
  form: UseFormReturn;
};

const BlockField = (props: BlockFieldProps) => {
  const [blocks, setBlocks] = useState<any[]>([
    { fields: props.field.fields || [] },
  ]);
  const [openedBlockIndex, setOpenedBlockIndex] = useState<number | null>(null);
  const { field, form } = props;

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBlocks((p) => [...p, { fields: field.fields || [] }]);
  };

  if (!field.fields || !field.fields.length) {
    return <></>;
  }

  return (
    <div className="mb-4">
      {/* <div className="w-full bg-slate-200 h-[1px] mb-4"></div> */}
      <div>
        {blocks.map((block, j) => (
          <div
            className="space-y-4 p-4 rounded-lg bg-slate-50 rounded-md"
            key={j}
          >
            {block.fields?.map((childField: Field) => (
              <FieldRenderer
                key={childField.name}
                field={childField}
                onChange={(name, value) => {
                  const newValue = { ...(props.value || {}), [name]: value };
                  props.onChange(props.name, newValue);
                }}
                value={props.value?.[childField.name]}
                form={form}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        style={{
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
        }}
        className="text-sm font-[500] flex items-center gap-2 rounded-lg border border-slate-100 py-1 px-2 mt-2 cursor-pointer"
      >
        <PlusIcon className="w-4 h-4" />
        {props.field.addLabel || "Add"}
      </button>
    </div>
  );
};

export default BlockField;
