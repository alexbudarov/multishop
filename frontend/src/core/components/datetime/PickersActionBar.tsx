import { Button, DialogActions } from "@mui/material";
import { PickersActionBarProps } from "@mui/x-date-pickers";
import { useTranslate } from "react-admin";

export const PickersActionBar = ({ onClear, onAccept, className }: PickersActionBarProps) => {
  const translate = useTranslate();
  return (
    <DialogActions className={className}>
      <Button onClick={onClear}>{translate("ra.action.clear_input_value")}</Button>
      <Button onClick={onAccept}>{translate("ra.action.confirm")}</Button>
    </DialogActions>
  );
};
