// File: /components/StepHeader/StepHeader.tsx
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:55:27 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import React from "react";

type StepHeaderProps = {
  title?: string;
  subtitle?: string;
};

const StepHeader = (props: StepHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{props.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{props.subtitle}</p>
    </div>
  );
};

export default StepHeader;
