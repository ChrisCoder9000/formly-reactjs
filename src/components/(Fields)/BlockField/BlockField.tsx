// File: /components/(Fields)/BlockField/BlockField.tsx
// Created Date: Friday January 24th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Friday January 24th 2025 5:42:36 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { ColorsOverwrites, Field } from "../../../constants/types";
import { PlusIcon, Trash2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useBlocksField } from "./hooks";
import BlockFieldRenderer from "./BlockFieldRenderer";

type BlockFieldProps = {
  value: Record<string, any>[];
  onChange: (name: string, value: any) => void;
  name: string;
  errored: FieldError | Record<string, FieldError>[] | undefined;
  field: Field;
  form: UseFormReturn;
  colors?: ColorsOverwrites;
  formData?: Record<string, any>;
};

const BlocksField = (props: BlockFieldProps) => {
  const { field, form } = props;
  const { blocks, setBlocks, openedBlockIndex, setOpenedBlockIndex } =
    useBlocksField({
      fields: field.fields || [],
      value: props.value,
    });

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBlocks((p) => [...p, { fields: field.fields || [] }]);
    props.onChange(field.name, [...props.value, {}]);
  };

  const handleRemove = (index: number) => {
    setBlocks((p) => p.filter((_, i) => i !== index));
    props.onChange(
      field.name,
      [...props.value].filter((_, i) => i !== index)
    );
  };

  if (!field.fields || !field.fields.length) {
    return <></>;
  }

  const blockErrored =
    typeof props.errored === "object"
      ? (props.errored as FieldError)?.ref?.name.includes(field.name)
      : false;

  return (
    <div className="!mb-4">
      {/* <div className="w-full bg-slate-200 h-[1px] mb-4"></div> */}
      <div className="space-y-2">
        {blocks.map((block, j) => (
          <div
            className={cn(
              openedBlockIndex === j
                ? cn(
                    "space-y-4 p-4 rounded-lg",
                    blockErrored ? "bg-destructive/10" : "bg-primary/5"
                  )
                : ""
            )}
            key={j}
          >
            {openedBlockIndex === j ? (
              block.fields?.map((childField: Field, k: number) => (
                <BlockFieldRenderer
                  errored={
                    Array.isArray(props.errored)
                      ? (props.errored as Record<string, FieldError>[])?.find(
                          (e: Record<string, FieldError>) =>
                            e && childField.name in e
                        )?.[childField.name]
                      : undefined
                  }
                  key={k}
                  field={childField}
                  onChange={(name, value) => {
                    const prev = props.value[j] ?? {};
                    const newValue = [...(props.value || [])];
                    newValue[j] = { ...prev, [name]: value };
                    props.onChange(name, newValue);
                  }}
                  value={props.value[j]?.[childField.name]}
                  form={form}
                  colors={props.colors}
                  formData={props.formData}
                />
              ))
            ) : (
              <div
                className={cn(
                  "flex items-center justify-between cursor-pointer py-2 px-4 rounded-md",
                  blockErrored ? "bg-destructive/10" : "bg-primary/5",
                  blockErrored ? "text-destructive" : "text-primary",
                  blockErrored
                    ? "hover:bg-destructive/10"
                    : "hover:bg-primary/10"
                )}
                onClick={() => setOpenedBlockIndex(j)}
              >
                <p className={cn("text-xs font-[600]", "text-primary")}>
                  {field.openLabel || "Open"}
                </p>
                <Trash2
                  size={14}
                  className={cn("text-primary/30")}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleRemove(j);
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
        className={cn(
          `text-sm font-[500] flex items-center gap-2 rounded-lg border py-1 px-2 mt-2 cursor-pointer`,
          "border-foreground/10",
          "text-primary",
          "bg-muted-foreground/5"
        )}
      >
        <PlusIcon className="w-4 h-4" />
        {props.field.addLabel || "Add"}
      </button>
    </div>
  );
};

export default BlocksField;
