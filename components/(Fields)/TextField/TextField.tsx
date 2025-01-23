// File: /components/(Fields)/TextField/TextField.tsx
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 1:45:36 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { Input } from "../../../components/ui/input";
import {
  FieldType,
  PHONE_MASKS,
  PHONE_PREFIXES,
} from "../../../constants/enums";
import { cn } from "../../../lib/utils";
import {
  ChevronDown,
  Eye,
  EyeOff,
  Hash,
  LetterText,
  Link,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import React, { useState } from "react";
import { FieldError } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type PhoneNumber = {
  countryCode: string;
  phoneNumber: string;
  prefix: string;
};

type TextFieldProps = {
  type:
    | FieldType.EMAIL
    | FieldType.NUMBER
    | FieldType.TEXT
    | FieldType.URL
    | FieldType.SECRET
    | FieldType.PHONE;
  value: string;
  placeholder?: string;
  onChange: (name: string, value: string | PhoneNumber) => void;
  name: string;
  errored?: FieldError;
};

const TextField = (props: TextFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("USA");

  const formatPhoneNumber = (value: string) => {
    const numbers = value ? value?.replace(/\D/g, "") : "";
    const mask = PHONE_MASKS[countryCode] || PHONE_MASKS.USA;

    let formattedNumber = "";
    let numberIndex = 0;

    for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
      if (mask[i] === "9") {
        formattedNumber += numbers[numberIndex];
        numberIndex++;
      } else {
        formattedNumber += mask[i];
      }
    }

    if (formattedNumber.match(/[\s-()]$/)) {
      formattedNumber = formattedNumber.slice(0, -1);
    }

    return formattedNumber;
  };

  return (
    <div className="relative">
      {(() => {
        if (props.type === FieldType.PHONE) {
          return (
            <div className="flex items-center gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="text-sm text-muted-foreground max-w-[115px] h-9 max-h-unset py-1 px-2">
                  <SelectValue placeholder={PHONE_PREFIXES["USA"]}>
                    {countryCode} ({PHONE_PREFIXES[countryCode]})
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PHONE_PREFIXES).map(([code, prefix]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({prefix})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input
                  type="tel"
                  value={formatPhoneNumber(
                    (props.value as unknown as PhoneNumber)?.phoneNumber ?? ""
                  )}
                  className={cn(
                    props.errored ? "border-red-500 bg-red-50" : "",
                    "pl-10"
                  )}
                  placeholder={props.placeholder}
                  onChange={(e) => {
                    const rawValue = e.target.value
                      ? e.target.value?.replace(/\D/g, "")
                      : "";
                    props.onChange(props.name, {
                      countryCode,
                      phoneNumber: rawValue,
                      prefix: PHONE_PREFIXES[countryCode],
                    });
                  }}
                  maxLength={15}
                />
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
            </div>
          );
        } else {
          return (
            <Input
              type={
                props.type === FieldType.SECRET
                  ? isVisible
                    ? "text"
                    : "password"
                  : props.type
              }
              value={props.value ?? ""}
              className={cn(
                props.errored ? "border-red-500 bg-red-50" : "",
                "pl-10"
              )}
              placeholder={props.placeholder}
              onChange={(e) => props.onChange(props.name, e.target.value)}
            />
          );
        }
      })()}
      {(() => {
        switch (props.type) {
          case FieldType.EMAIL:
            return (
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            );
          case FieldType.NUMBER:
            return (
              <Hash
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            );
          case FieldType.URL:
            return (
              <Link
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            );
          case FieldType.SECRET:
            return (
              <div>
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                {isVisible ? (
                  <Eye
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    onClick={() => setIsVisible(false)}
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    onClick={() => setIsVisible(true)}
                  />
                )}
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default TextField;
