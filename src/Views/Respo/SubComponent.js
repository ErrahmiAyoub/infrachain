import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// import video from "../assets/img/blockchain.mp4";
import Button from "../../component/Button";
import Dialog from "../../component/FormDialog";
import SnackBar from "../../component/SnackBar";

import PublishIcon from "@material-ui/icons/Publish";
import MailIcon from "@material-ui/icons/MailOutline";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "16px",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  control: {
    padding: theme.spacing(2),
  },
  div: {
    position: "fixed",
    top: "100px",
    left: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "blue",
    width: "100%",
  },
  inputDiv: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Verification() {
  const classes = useStyles();
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleDialogAction = () => {
    setSuccess(true);
  };

  function showname() {
    var name = document.getElementById("fileInput");
    setFileName(name.files.item(0).name);
  }
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {open && (
        <Dialog
          title="Validation"
          content="Voulez-vous valider l'action"
          open={open}
          setOpen={setOpen}
          handleAction={handleDialogAction}
        />
      )}
      {success && <SnackBar show={success} type="success" message="Succès" />}
      <Typography variant="h5">
        Enregistrer le document dans le blockchain et envoyé un email au
        étudiant
      </Typography>
      <div className={classes.inputDiv}>
        <TextField
          variant="outlined"
          placeholder="Télécharger votre fichier"
          fullWidth
          size="small"
          value={fileName}
          disabled
        />

        <input
          accept="application/pdf"
          className={classes.input}
          id="fileInput"
          multiple
          hidden
          type="file"
          onChange={showname}
        />
        <label htmlFor="fileInput">
          <Button
            className={classes.margin}
            variant="contained"
            component="span"
            color="rgb(4,119,194)"
          >
            <PublishIcon size="large" />
          </Button>
        </label>
        <Button
          className={classes.margin}
          style={{ padding: "8px 32px" }}
          variant="contained"
          color="#008000"
          onClick={handleClick}
        >
          <MailIcon />
        </Button>
      </div>
      <div className={classes.margin}>
        <Typography> {message} </Typography>
      </div>
    </Container>
  );
}
