// File: /components/(Fields)/OtpField/OtpField.tsx
// Created Date: Monday January 27th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Monday January 27th 2025 3:45:12 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../ui/input-otp";
import { FieldError } from "react-hook-form";
import { cn } from "../../../lib/utils";

type OtpFieldProps = {
  value: string;
  onChange: (name: string, value: string) => void;
  errored?: FieldError;
  name: string;
};

const OtpField = (props: OtpFieldProps) => {
  return (
    <InputOTP
      maxLength={6}
      value={props.value}
      onChange={(value) => props.onChange(props.name, value)}
      name={props.name}
      className={cn(
        typeof props.errored === "object" && props.errored
          ? "border-red-500 bg-red-50"
          : ""
      )}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      {/* <InputOTPSeparator />
      <InputOTPGroup>
      </InputOTPGroup> */}
    </InputOTP>
  );
};

export default OtpField;
