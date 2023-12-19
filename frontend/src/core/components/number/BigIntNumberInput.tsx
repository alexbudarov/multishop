import { NumberInput, NumberInputProps } from "react-admin";
import { formatNumber } from "../../format/formatNumber";
import { parseNumber } from "../../format/parseNumber";

export const BigIntNumberInput = (props: NumberInputProps) => {
  return <NumberInput format={formatNumber} parse={parseNumber} {...props} />;
};
