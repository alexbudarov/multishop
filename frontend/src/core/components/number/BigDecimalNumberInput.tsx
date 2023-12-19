import { NumberInput, NumberInputProps } from "react-admin";
import { BIG_DECIMAL_FRACTION_DIGITS } from "../../format/constants";
import { formatNumber } from "../../format/formatNumber";
import { parseNumber } from "../../format/parseNumber";

export const BigDecimalNumberInput = (props: NumberInputProps) => {
  return (
    <NumberInput
      format={formatNumber}
      parse={(value) => parseNumber(value, BIG_DECIMAL_FRACTION_DIGITS)}
      {...props}
    />
  );
};
