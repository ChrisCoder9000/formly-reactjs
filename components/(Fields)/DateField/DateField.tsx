// File: /components/(Fields)/DateField/DateField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 1:40:47 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { FieldType } from "../../../constants/enums";
import { cn } from "../../../lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { FieldError } from "react-hook-form";

type DateFieldProps = {
  type: FieldType.DATE | FieldType.DATE_RANGE;
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
              const fromDate = props.value?.from
                ? new Date(props.value.from)
                : null;
              const toDate = props.value?.to ? new Date(props.value.to) : null;

              if (fromDate && !isNaN(fromDate.getTime())) {
                if (toDate && !isNaN(toDate.getTime())) {
                  return (
                    <>
                      {format(fromDate, "LLL dd, y")} -{" "}
                      {format(toDate, "LLL dd, y")}
                    </>
                  );
                }
                return format(fromDate, "LLL dd, y");
              }
              return <span>Pick a date</span>;
            }
            const date = new Date(props.value);
            return !isNaN(date.getTime()) ? (
              format(date, "PPP")
            ) : (
              <span>Pick a date</span>
            );
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
