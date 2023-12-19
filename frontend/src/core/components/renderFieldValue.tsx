/**
 * Additional line break required on 'show' screen,
 * when we render empty value.
 *
 * @param value field value
 * @param defaultValue default value, used when value is `null`; if default value not set render `<br/>`
 */
export function renderFieldValue(value: string | null, defaultValue = <br />) {
  if (value != null && value.length != null && value.length > 0) {
    return value;
  }
  return defaultValue;
}
