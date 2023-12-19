import { LocalizationProvider, TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FieldTitle, InputHelperText, InputProps, useInput, useLocaleState } from "react-admin";
import { OFFSET_TIME_FORMAT } from "../../../dataProvider/dataProviderFormats";
import { PickersActionBar } from "./PickersActionBar";

export interface OffsetTimeInputProps
  extends Omit<InputProps, "onChange" | "format" | "defaultValue">,
    Omit<TimePickerProps<Dayjs>, "label"> {}

/**
 * Input for working with Time graphQL scalar in react-admin.
 */
export const OffsetTimeInput = ({ format, ...props }: OffsetTimeInputProps) => {
  const { field, fieldState, id, isRequired, formState } = useInput({
    parse: (value) => value?.format(OFFSET_TIME_FORMAT),
    ...props,
    format: (value) => (value ? dayjs(value, "HH:mm") : null),
  });
  const [locale] = useLocaleState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <TimePicker
        {...field}
        inputRef={field.ref}
        label={<FieldTitle label={props.label} source={props.source} isRequired={isRequired} />}
        slots={{
          actionBar: PickersActionBar,
        }}
        slotProps={{
          textField: {
            id,
            error: fieldState.error != null,
            helperText: (
              <InputHelperText
                touched={fieldState.isTouched || formState.isSubmitted}
                error={fieldState.error?.message}
                helperText={props.helperText}
              />
            ),
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};
