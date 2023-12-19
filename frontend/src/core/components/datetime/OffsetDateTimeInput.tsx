import { DateTimePicker, DateTimePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FieldTitle, InputHelperText, InputProps, useInput, useLocaleState } from "react-admin";
import { OFFSET_DATE_TIME_FORMAT } from "../../../dataProvider/dataProviderFormats";
import { PickersActionBar } from "./PickersActionBar";

export interface OffsetDateTimeInputProps
  extends Omit<InputProps, "onChange" | "format" | "defaultValue">,
    Omit<DateTimePickerProps<Dayjs>, "label"> {}

/**
 * Input for working with DateTime graphQL scalar in react-admin.
 */
export const OffsetDateTimeInput = ({ format, ...props }: OffsetDateTimeInputProps) => {
  const { field, fieldState, id, isRequired, formState } = useInput({
    parse: (value) => value?.format(),
    ...props,
    format: (value) => (value ? dayjs(value, OFFSET_DATE_TIME_FORMAT) : null),
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
