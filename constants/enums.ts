// File: /constants/enums.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:31:39 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----

export enum FieldType {
  // TEXT
  TEXT = "text",
  TEXT_AREA = "text_area",
  NUMBER = "number",
  EMAIL = "email",
  SECRET = "secret",
  URL = "url",
  PHONE = "phone",

  // FILES
  FILES = "files",

  // DATES
  DATE = "date",
  DATE_TIME = "date_time",
  TIME = "time",
  DATE_RANGE = "date_range",

  // OPTIONS
  SELECT = "select",
  MULTI_SELECT = "multi_select",
  RADIO = "radio",

  // BOOLEAN
  CHECKBOX = "checkbox",
}
