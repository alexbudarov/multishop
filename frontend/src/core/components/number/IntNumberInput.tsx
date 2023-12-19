import { NumberInput, NumberInputProps } from "react-admin";
import { MAX_INT_VALUE, MIN_INT_VALUE } from "../../format/constants";
import { formatNumber } from "../../format/formatNumber";
import { parseNumber } from "../../format/parseNumber";

export const IntNumberInput = (props: NumberInputProps) => {
  return (
    <NumberInput
      max={MAX_INT_VALUE}
      min={MIN_INT_VALUE}
      format={formatNumber}
      parse={parseNumber}
      {...props}
    />
  );
};
