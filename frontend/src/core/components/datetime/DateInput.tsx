import { DatePicker, DatePickerProps, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FieldTitle, InputHelperText, InputProps, useInput, useLocaleState } from "react-admin";
import { DATE_FORMAT } from "../../../dataProvider/dataProviderFormats";
import { PickersActionBar } from "./PickersActionBar";

export interface DateInputProps
  extends Omit<InputProps, "onChange" | "format" | "defaultValue">,
    Omit<DatePickerProps<Dayjs>, "label"> {}

/**
 * Input for working with Date graphQL scalar in react-admin.
 */
export const DateInput = ({ format, ...props }: DateInputProps) => {
  const { field, fieldState, id, isRequired, formState } = useInput({
    parse: (value) => value?.format(DATE_FORMAT),
    ...props,
    format: (value) => (value ? dayjs(value, DATE_FORMAT) : null),
  });
  const [locale] = useLocaleState();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
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
