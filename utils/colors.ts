// File: /utils/colors.ts
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 5:22:19 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

import { TW_COLORS } from "../constants/colors";

export const colorBuilder = (
  type: "bg" | "text" | "border",
  color: TW_COLORS,
  opacity: string
) => {
  return `${type}-${color}-${opacity}`;
};
