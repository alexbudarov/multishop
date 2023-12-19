import { camelCase } from "change-case";
import { singular } from "pluralize";

export const getListOperationName = (resource: string, meta?: { operation: string }): string => {
  return meta?.operation ?? `${camelCase(singular(resource.replace("DTO", "")))}List`;
};
