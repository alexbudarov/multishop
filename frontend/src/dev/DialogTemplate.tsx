import { useMemo, useState } from "react";
import { useTranslate } from "react-admin";
import { Button, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material";

export const DialogTemplate = () => {
  interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
  }

  const SimpleDialog = useMemo(
    () =>
      function SimpleDialog({ onClose, open }: SimpleDialogProps) {
        return (
          <Dialog
            /*vtl #if($dialog.fullScreen) fullScreen #end*/
            /*vtl #if($dialog.fullWidth) fullWidth #end*/
            /*vtl #if($dialog.maxWidth) */
              /*vtl maxWidth={#if($dialog.maxWidth == false) false #else "$dialog.maxWidth" #end}*/
            /*vtl #end */
            onClose={onClose}
            open={open}
              /*vtl #if($dialog.position == 'top' || $dialog.position == 'bottom')*/
                sx={{
                  '& .MuiDialog-container': {
                    /*vtl alignItems: #if($dialog.position == 'top') 'flex-start' #elseif($dialog.position == 'bottom') 'flex-end' #end, */
                  }
                }}
              /*vtl #end */
          >
            {/*vtl #if($dialog.title) */}
            <DialogTitle>{/*vtl $dialog.title*/}</DialogTitle>
            {/*vtl #end */}
            <DialogContent>
              {/*vtl #if($dialog.content) */}
              <DialogContentText>
                {/*vtl $dialog.content*/}
              </DialogContentText>
              {/*vtl #end */}
            </DialogContent>
            <DialogActions>
              {/*vtl #foreach($action in $dialog.actions)*/}
              <Button
                /*vtl
                  #if($action.type == 'ok')
                    onClick={() => {
                      // TODO Override ok action
                      onClose();
                    }}
                  #elseif($action.type == 'cancel')
                    onClick={onClose}
                  #else
                    onClick={() => {
                      // TODO Write custom action
                    }}
                  #end
                */
              >
                {/*vtl $action.label*/}
              </Button>
              {/*vtl #end*/}
            </DialogActions>
          </Dialog>
        );
      },
    []
  );

  const translate = useTranslate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {translate("ra.action.open")}
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
