import { DateTimePicker, DateTimePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FieldTitle, InputHelperText, InputProps, useInput, useLocaleState } from "react-admin";
import { PickersActionBar } from "./PickersActionBar";

export interface TimestampInputProps
  extends Omit<InputProps, "onChange" | "format" | "defaultValue">,
    Omit<DateTimePickerProps<Dayjs>, "label"> {}

/**
 * Input for working with Timestamp graphQL scalar in react-admin.
 */
export const TimestampInput = ({ format, ...props }: TimestampInputProps) => {
  const { field, fieldState, id, isRequired, formState } = useInput({
    parse: (value) => (value ? value.unix() * 1000 : null),
    ...props,
    format: (value) => (value ? dayjs.unix(value / 1000) : null),
  });
  const [locale] = useLocaleState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker
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
