import { SelectInput, SelectInputProps } from "react-admin";
import { EnumChoice } from "./EnumChoice";
import { useGetEnumChoices } from "./useGetEnumChoices";

export interface EnumInputProps
  extends Omit<SelectInputProps, "choices" | "field" | "fieldState" | "formState"> {
  enum: Record<string, string>;
  enumTypeName: string;
}

/**
 * React Admin SelectInput fot enums with localized enum captions in dropdown.
 *
 * @param props
 * @constructor
 */
export const EnumInput = (props: EnumInputProps) => {
  const choices: EnumChoice[] = useGetEnumChoices(props);
  const { enumTypeName, ...selectInputProps } = props;
  return <SelectInput choices={choices} {...selectInputProps} />;
};
