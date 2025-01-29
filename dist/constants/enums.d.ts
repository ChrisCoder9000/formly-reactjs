export declare enum FieldType {
    TEXT = "text",
    TEXT_AREA = "text_area",
    NUMBER = "number",
    EMAIL = "email",
    SECRET = "secret",
    URL = "url",
    PHONE = "phone",
    OTP = "otp",
    DATE = "date",
    DATE_RANGE = "date_range",
    SELECT = "select",
    MULTI_SELECT = "multi_select",
    OPTION = "option",
    MULTI_OPTION = "multi_option",
    CHOICE = "choice",
    MULTI_CHOICE = "multi_choice",
    CHECKBOX = "checkbox",
    BLOCKS = "blocks",
    FILES = "files"
}
export type FieldTypeFlex = (typeof FieldType)[keyof typeof FieldType] | string;
export declare const PHONE_MASKS: Record<string, string>;
export declare const PHONE_PREFIXES: Record<string, string>;
