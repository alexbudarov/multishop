import { NumberInputProps } from "react-admin";
import { BigIntNumberInput } from "./BigIntNumberInput";

export const LongNumberInput = (props: NumberInputProps) => {
  return <BigIntNumberInput {...props} />;
};
