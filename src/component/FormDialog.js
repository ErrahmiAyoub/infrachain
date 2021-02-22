import React from "react";
// import Button from "@material-ui/core/Button";
import Alert from "./Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function FormDialog(props) {
  const {
    handleAction,
    setOpen,
    open,
    title,
    content,
    children,
    empty,
    ...rest
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        {...rest}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        {empty && (
          <Alert type="error" message="Remplir le champ avant valider" />
        )}
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="secondary">
            {" "}
            Annuler
          </Button> */}

          <IconButton
            onClick={handleClose}
            aria-label="Cancel"
            size="large"
            color="secondary"
          >
            <CancelIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            onClick={() => {
              handleAction();
              handleClose();
            }}
            size="large"
            style={{ color: "#00695f" }}
          >
            <CheckCircleIcon fontSize="large" />
          </IconButton>

          {/* <Button onClick={handleAction} style={{ color: "#00695f" }}>
            {" "}
            Valider{" "}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
