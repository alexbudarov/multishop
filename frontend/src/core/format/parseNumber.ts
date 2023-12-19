/**
 * The parse prop accepts a callback taking the value from the input (which is a string),
 * and returning the value to put in the form state.
 * https://marmelab.com/react-admin/Inputs.html#parse
 */
export function parseNumber(value: string | null, fractionDigits: number = 0): string {
  return value == null || value === "" ? "" : Number(value).toFixed(fractionDigits);
}
