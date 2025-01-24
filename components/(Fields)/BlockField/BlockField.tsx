// File: /components/(Fields)/BlockField/BlockField.tsx
// Created Date: Friday January 24th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Friday January 24th 2025 5:42:36 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React, { useState } from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { Field } from "../../../constants/types";
import FieldRenderer from "../../../components/FieldRenderer";
import { PlusIcon, Trash, Trash2 } from "lucide-react";
import { colorBuilder } from "../../../utils/colors";
import { cn } from "../../../lib/utils";
import { getNestedValue } from "../../../utils/data";

type BlockFieldProps = {
  value: Record<string, any>[];
  onChange: (name: string, value: any) => void;
  name: string;
  errored: FieldError | undefined;
  field: Field;
  form: UseFormReturn;
};

const BlocksField = (props: BlockFieldProps) => {
  const [blocks, setBlocks] = useState<any[]>([
    { fields: props.field.fields || [] },
  ]);
  const [openedBlockIndex, setOpenedBlockIndex] = useState<number>(0);
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
    <div className="!mb-4">
      {/* <div className="w-full bg-slate-200 h-[1px] mb-4"></div> */}
      <div className="space-y-2">
        {blocks.map((block, j) => (
          <div
            className={cn(
              openedBlockIndex === j
                ? cn(
                    "space-y-4 p-4 rounded-lg rounded-md",
                    colorBuilder("bg", props.errored ? "red" : "slate", "50")
                  )
                : ""
            )}
            key={j}
          >
            {openedBlockIndex === j ? (
              block.fields?.map((childField: Field) => (
                <FieldRenderer
                  errored={props.errored}
                  key={childField.name}
                  field={childField}
                  onChange={(name, value) => {
                    const prev = props.value[j] ?? {};
                    const otherBlocks = props.value?.filter(
                      (_: any, i: number) => i !== j
                    );
                    props.onChange(name, [
                      ...otherBlocks,
                      { ...prev, [name]: value },
                    ]);
                  }}
                  value={props.value[j]?.[childField.name]}
                  form={form}
                />
              ))
            ) : (
              <div
                className={cn(
                  "flex items-center justify-between cursor-pointer py-2 px-4 rounded-md",
                  colorBuilder("bg", props.errored ? "red" : "slate", "50"),
                  colorBuilder("text", props.errored ? "red" : "slate", "500"),
                  `hover:${colorBuilder(
                    "bg",
                    props.errored ? "red" : "slate",
                    "50"
                  )}`
                )}
                onClick={() => setOpenedBlockIndex(j)}
              >
                <p className="text-xs font-[600]">
                  {field.openLabel || "Open"}
                </p>
                <Trash2
                  size={14}
                  // className={cn(colorBuilder("text", "slate", "300"))}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setBlocks((p) => p.filter((_, i) => i !== j));
                  }}
                />
              </div>
            )}
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

export default BlocksField;
