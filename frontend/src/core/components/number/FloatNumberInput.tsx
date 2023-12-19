import { NumberInput, NumberInputProps } from "react-admin";
import { FLOAT_FRACTION_DIGITS } from "../../format/constants";
import { formatNumber } from "../../format/formatNumber";
import { parseNumber } from "../../format/parseNumber";

export const FloatNumberInput = (props: NumberInputProps) => {
  return (
    <NumberInput
      format={formatNumber}
      parse={(value) => parseNumber(value, FLOAT_FRACTION_DIGITS)}
      {...props}
    />
  );
};
