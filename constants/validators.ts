// File: /constants/validators.ts
// Created Date: Wednesday January 29th 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 29th 2025 1:17:36 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

export const VALIDATORS: Record<string, (...args: any[]) => boolean> = {
  pattern: (pattern: string, value: string) => {
    return new RegExp(pattern).test(value);
  },
  custom: (fn: (value: string) => boolean, value: string) => {
    return fn(value);
  },
};
