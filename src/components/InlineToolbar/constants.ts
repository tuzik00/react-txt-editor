export const LIST_MIN_COUNT = 2;
export const LINK_MAX_LENGTH = 2048;

// Регулярное выражение ссылки
export const URL_REGEXP = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';

export enum ActionType {
    BLOCK,
    ENTITY,
    INLINE,
}

export enum RenderType {
    LIST = 'list',
    SINGLE = 'single',
}

export enum SelectionType {
    DEFAULT = 'default',
    LINK_INPUT = 'link-input',
}
