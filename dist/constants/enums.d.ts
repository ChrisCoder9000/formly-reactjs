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
    DATE_TIME = "date_time",// TODO: [ missing ]
    TIME = "time",// TODO: [ missing ]
    SELECT = "select",
    MULTI_SELECT = "multi_select",
    OPTION = "option",
    MULTI_OPTION = "multi_option",
    CHOICE = "choice",
    MULTI_CHOICE = "multi_choice",
    RADIO = "radio",// TODO: [ missing ]
    CHECKBOX = "checkbox",
    BLOCKS = "blocks",
    FILES = "files",
    PAYMENT = "payment",// TODO: [ missing ]
    INFO_TEXT = "info_text",// TODO: [ missing ]
    IMAGE = "image",// TODO: [ missing ]
    VIDEO = "video",// TODO: [ missing ]
    DOWNLOAD = "download",// TODO: [ missing ]
    LINK = "link"
}
export declare const PHONE_MASKS: Record<string, string>;
export declare const PHONE_PREFIXES: Record<string, string>;
