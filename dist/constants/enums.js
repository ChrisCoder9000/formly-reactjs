"use strict";
// File: /constants/enums.ts
// Created Date: Wednesday January 22nd 2025
// Author: Christian Nonis <alch.infoemail@gmail.com>
// -----
// Last Modified: Wednesday January 22nd 2025 7:31:39 pm
// Modified By: the developer formerly known as Christian Nonis at <alch.infoemail@gmail.com>
// -----
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldType = void 0;
var FieldType;
(function (FieldType) {
    // TEXT
    FieldType["TEXT"] = "text";
    FieldType["TEXT_AREA"] = "text_area";
    FieldType["NUMBER"] = "number";
    FieldType["EMAIL"] = "email";
    FieldType["SECRET"] = "secret";
    FieldType["URL"] = "url";
    FieldType["PHONE"] = "phone";
    FieldType["OTP"] = "otp";
    // FILES
    FieldType["FILES"] = "files";
    // DATES
    FieldType["DATE"] = "date";
    FieldType["DATE_RANGE"] = "date_range";
    FieldType["DATE_TIME"] = "date_time";
    FieldType["TIME"] = "time";
    // OPTIONS
    FieldType["SELECT"] = "select";
    FieldType["MULTI_SELECT"] = "multi_select";
    FieldType["OPTION"] = "option";
    FieldType["MULTI_OPTION"] = "multi_option";
    FieldType["RADIO"] = "radio";
    // BOOLEAN
    FieldType["CHECKBOX"] = "checkbox";
    // BLOCKS
    FieldType["BLOCK"] = "block";
    // OTHER
    FieldType["PAYMENT"] = "payment";
    FieldType["INFO_TEXT"] = "info_text";
    FieldType["IMAGE"] = "image";
    FieldType["VIDEO"] = "video";
    FieldType["DOWNLOAD"] = "download";
    FieldType["LINK"] = "link";
})(FieldType || (exports.FieldType = FieldType = {}));
