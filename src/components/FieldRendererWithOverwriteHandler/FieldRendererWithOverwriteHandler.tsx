// File: /components/FieldRendererWithOverwriteHandler/FieldRendererWithOverwriteHandler.tsx
// Created Date: Tuesday January 28th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Tuesday January 28th 2025 12:44:49 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import { FieldRenderer, FieldRendererProps } from "../FieldRenderer";
import { fillNestedField, getNestedValue } from "../../utils/data";
import {
  FieldOverwriteOnChangeProps,
  FormFieldOverrides,
  FieldComponentOverrides,
  Field,
  ColorsOverwrites,
} from "../../constants/types";
import { FieldType } from "../../constants/enums";
import { useBlocksField } from "../(Fields)/BlockField/hooks";

type FieldRendererWithOverwriteHandlerProps = Omit<
  FieldRendererProps,
  "onChange"
> & {
  fieldOverwrites?: Partial<FieldComponentOverrides>;
  stepIndex: number;
  formValues: Record<string, any>;
  formData: Record<string, any>;
};

const FieldRendererWithOverwriteHandler = (
  props: FieldRendererWithOverwriteHandlerProps
) => {
  const { blocks, setBlocks } = useBlocksField({
    fields: props.field.fields || [],
    value: props.value,
    isBlock: props.field.type === FieldType.BLOCKS,
  });

  let CurrentComponent = (
    <FieldRenderer
      formData={props.formData}
      form={props.form}
      errored={props.form.formState.errors[props.field.name] as any}
      field={props.field}
      colors={props.colors}
      onChange={(_, value) => {
        const _formData = fillNestedField(
          props.field.name,
          value,
          props.formValues
        );
        props.form.setValue(props.field.name, _formData[props.field.name]);
      }}
      value={getNestedValue(
        props.field.name,
        props.form.getValues(),
        props.field.type
      )}
    />
  );

  if (props.fieldOverwrites?.[props.field.type]) {
    const baseProps = {
      errored: props.form.formState.errors[props.field.name] as any,
      onChange: (
        value: FieldOverwriteOnChangeProps<typeof props.field.type>
      ) => {
        const _formData = fillNestedField(
          props.field.name,
          value,
          props.formValues
        );
        props.form.setValue(props.field.name, _formData[props.field.name], {
          shouldDirty: true,
          shouldValidate: true,
        });
      },
      value: getNestedValue(
        props.field.name,
        props.form.getValues(),
        props.field.type
      ),
      defaultComponent: CurrentComponent,
      label: props.field.label,
      description: props.field.description,
      placeholder: props.field.placeholder,
      options: props.field.options,
      stepIndex: props.stepIndex,
      name: props.field.name,
    };

    const blockProps: any = {
      ...baseProps,
      onAddBlock: () => {
        setBlocks((p) => [...p, { fields: props.field.fields ?? [] }]);
        props.form.setValue(props.field.name, [
          ...(props.form.getValues()?.[props.field.name] || []),
          {},
        ]);
      },
      onRemoveBlock: (index: number) => {
        setBlocks((p) => p.filter((_, i) => i !== index));
        const newValue = [...(props.value ?? [])].filter((_, i) => i !== index);
        props.form.setValue(props.field.name, newValue);
      },
      onValueChange: (blockIndex: number, name: any, value: any) => {
        const prev = props.value[blockIndex] ?? {};
        const newValue = [...(props.value || [])];
        newValue[blockIndex] = { ...prev, [name]: value };
        props.form.setValue(props.field.name, newValue);
      },
      blocks: [],
    };

    blockProps.blocks = blocks?.map((b, j) => ({
      ...b,
      fields: b.fields?.map(
        (
          f: Field & {
            defaultComponent: React.ReactElement;
            value: any;
          },
          i: number
        ) => {
          const localBaseProps = {
            ...baseProps,
            onChange: (value: FieldOverwriteOnChangeProps<typeof f.type>) => {
              const prev = props.value?.[j] ?? {};
              const newValue = [...(props.value || [])];
              newValue[j] = { ...prev, [f.name]: value };
              props.form.setValue(props.field.name, newValue, {
                shouldDirty: true,
                shouldValidate: true,
              });
            },
            value: props.value?.[j]?.[f.name] ?? "",
            defaultComponent: CurrentComponent,
            label: f.label,
            description: f.description,
            placeholder: f.placeholder,
            options: f.options,
            stepIndex: props.stepIndex,
            name: f.name,
            key: i,
          };
          return {
            ...f,
            defaultComponent: props.fieldOverwrites?.[f.type] ? (
              f.type === FieldType.BLOCKS ? (
                React.cloneElement(
                  props.fieldOverwrites[FieldType.BLOCKS]!({
                    ...localBaseProps,
                    ...blockProps,
                  }),
                  { key: i }
                )
              ) : (
                React.cloneElement(
                  props.fieldOverwrites[
                    f.type as Exclude<FieldType, FieldType.BLOCKS>
                  ]!({ ...localBaseProps, options: f.options }),
                  { key: i }
                )
              )
            ) : (
              <FieldRenderer
                form={props.form}
                errored={props.form.formState.errors[f.name] as any}
                field={f}
                onChange={(name, value) => {
                  const prev = props.value?.[j] ?? {};
                  const newValue = [...(props.value || [])];
                  newValue[j] = { ...prev, [name]: value };
                  props.form.setValue(props.field.name, newValue, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                value={props.value?.[j]?.[f.name]}
                key={i}
                colors={props.colors}
                formData={props.formData}
              />
            ),
          };
        }
      ),
    }));

    const OverwrittenComponent: React.ReactElement =
      props.field.type === FieldType.BLOCKS
        ? props.fieldOverwrites[FieldType.BLOCKS]!({
            ...blockProps,
          })
        : props.fieldOverwrites[props.field.type]!(baseProps);

    return React.cloneElement(OverwrittenComponent, {
      field: props.field,
      form: props.form,
    });
  }
  return CurrentComponent;
};

export default FieldRendererWithOverwriteHandler;
