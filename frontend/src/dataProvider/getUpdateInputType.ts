import { pascalCase } from "change-case";

export const getUpdateInputType = (resource: string): string => {
  if (resource.endsWith("DTO")) {
    return `${pascalCase(resource.replace("DTO", ""))}InputDTO`;
  }
  return pascalCase(`${resource}Input`);
};
