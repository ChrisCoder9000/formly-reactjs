// File: /components/(Fields)/DateField/DateField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 1:40:47 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldType } from "@/constants/enums";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { FieldError } from "react-hook-form";

type DateFieldProps = {
  type:
    | FieldType.DATE
    | FieldType.DATE_RANGE
    | FieldType.DATE_TIME
    | FieldType.TIME;
  value: any;
  onChange: (name: string, value: any) => void;
  name: string;
  errored: FieldError | undefined;
};

const DateField = (props: DateFieldProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !props.value && "text-muted-foreground",
            props.errored && "border-red-500 bg-red-50 text-red-500"
          )}
        >
          <CalendarIcon />
          {(() => {
            if (!props.value) {
              return <span>Pick a date</span>;
            }
            if (
              typeof props.value === "object" &&
              !(props.value instanceof Date)
            ) {
              return props.value?.from ? (
                props.value?.to ? (
                  <>
                    {format(props.value.from, "LLL dd, y")} -{" "}
                    {format(props.value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(props.value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              );
            }
            return format(props.value, "PPP");
          })()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={
            props.type === FieldType.DATE
              ? "single"
              : props.type === FieldType.DATE_RANGE
              ? "range"
              : "single"
          }
          selected={props.value}
          onSelect={(date: any) => date && props.onChange(props.name, date)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateField;
