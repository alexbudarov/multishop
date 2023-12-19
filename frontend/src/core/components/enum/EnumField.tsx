import { SelectField, SelectFieldProps } from "react-admin";
import { EnumChoice } from "./EnumChoice";
import { useGetEnumChoices } from "./useGetEnumChoices";

export interface EnumFieldProps extends Omit<SelectFieldProps, "choices"> {
  enum: Record<string, string>;
  enumTypeName: string;
}

/**
 * React Admin SelectField fot enums with localized enum captions.
 *
 * @param props
 * @constructor
 */
export const EnumField = (props: EnumFieldProps) => {
  const choices: EnumChoice[] = useGetEnumChoices(props);
  const { enumTypeName, ...selectFieldProps } = props;
  return <SelectField choices={choices} {...selectFieldProps} />;
};
