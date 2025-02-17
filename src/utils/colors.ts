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

export const hexToHsl = (hex: string) => {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};

export const toOppositeColor = (hex: string) => {
  const [h, s, l] = hexToHsl(hex)
    .split(" ")
    .map((v) => parseInt(v));
  return `hsl(${h + 180}, ${s}%, ${100 - l}%)`;
};

export const lessHlsVivid = (hex: string) => {
  const [h, s, l] = hexToHsl(hex)
    .split(" ")
    .map((v) => parseInt(v));
  return `${h - 0} ${s - 20}% ${l - 2}%`;
};

export const lessHlsVivid2 = (hex: string) => {
  const [h, s, l] = hexToHsl(hex)
    .split(" ")
    .map((v) => parseInt(v));
  return `${h - 20}, ${s - 30}%, ${l - 4}%, 0.5`;
};
