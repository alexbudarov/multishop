/**
 * The format prop accepts a callback taking the value from the form state,
 * and returning the input value (which should be a string).
 * https://marmelab.com/react-admin/Inputs.html#format
 */
export function formatNumber(value: string | null): string {
  return value == null || value === "" ? "" : String(Number(value));
}
