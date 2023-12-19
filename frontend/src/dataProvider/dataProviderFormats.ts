/**
 * Server date and time formats. All date data from server received in formats, described below.
 * App transforms this data in format, more convenient for user (locale dependent).
 *
 * Date data, sent to server should be formatted
 * from frontend user-friendly view (locale dependent) according to that formats.
 */
export const DATE_FORMAT = "YYYY-MM-DD";
export const LOCAL_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const LOCAL_TIME_FORMAT = "HH:mm:ss";
export const OFFSET_DATE_TIME_FORMAT = "YYYY-MM-DDTHH:mmZ";
export const OFFSET_TIME_FORMAT = "HH:mm:ssZ";
