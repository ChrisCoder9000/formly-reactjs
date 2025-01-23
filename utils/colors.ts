// File: /utils/colors.ts
// Created Date: Thursday January 23rd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Thursday January 23rd 2025 5:22:19 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

export const colorBuilder = (
  type: "bg" | "text" | "border",
  color:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose" = "slate",
  opacity: string
) => {
  return `${type}-${color}-${opacity}`;
};
