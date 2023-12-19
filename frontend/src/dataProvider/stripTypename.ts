import { filterFieldValues } from "./filterFieldValues";

export type NullableObjectOrList =
  | Record<string, unknown>
  | Array<Record<string, unknown> | null>
  | null
  | undefined;

/**
 * Recursively remove '__typename' property from passed object
 * @param data - object to be stripped
 */
export const stripTypename = <T extends NullableObjectOrList>(data: T): T => {
  if (data == null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(stripTypename) as T;
  }

  return filterFieldValues(data as Record<string, unknown>, ["__typename"]) as T;
};
