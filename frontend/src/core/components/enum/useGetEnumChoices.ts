import { useMemo } from "react";
import { EnumChoice } from "./EnumChoice";

export function useGetEnumChoices(props: {
  enum: Record<string, string>;
  enumTypeName: string;
}): EnumChoice[] {
  return useMemo(
    () =>
      Object.values(props.enum).map(
        (value: string): EnumChoice => ({
          id: value,
          name: `enums.${props.enumTypeName}.${value}`,
        })
      ),
    [props.enum, props.enumTypeName]
  );
}
