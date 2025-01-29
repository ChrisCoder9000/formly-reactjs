// File: /components/StepHeader/StepHeader.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:55:27 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { colorBuilder } from "../../utils/colors";
import { ColorsOverwrites } from "../../constants/types";
import React from "react";

type StepHeaderProps = {
  title?: string;
  subtitle?: string;
  colors?: ColorsOverwrites;
};

const StepHeader = (props: StepHeaderProps) => {
  return (
    <div className="">
      <h1
        className={`text-2xl font-bold mb-1 ${colorBuilder(
          "text",
          props.colors?.text ?? "gray",
          "900"
        )}`}
      >
        {props.title}
      </h1>
      <p
        className={`text-sm ${colorBuilder(
          "text",
          props.colors?.textSecondary ?? "gray",
          "500"
        )} mb-6`}
      >
        {props.subtitle}
      </p>
    </div>
  );
};

export default StepHeader;
