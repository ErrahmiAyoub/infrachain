import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

// import video from "../assets/img/blockchain.mp4";
import Button from "../../component/Button";
import SubSection from "../../component/SubSection";
import Alert from "../../component/Alert";
import InlineInput from "../../component/InlineInputs";
import SnackBar from "../../component/SnackBar";
import Dialog from "../../component/FormDialog";

import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";

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
  title: {
    fontSize: "2em",
    fontWeight: "500",

    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
}));

export default function SubComponent({ row }) {
  const classes = useStyles();
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [echec, setEchec] = useState(false);

  let msgSuccess = `Le document ${fileName} est cértifier. Un mail est envoyé à ${row.original.Email}`;

  const handleDialogAction = () => {
    setSuccess(true);
    setEchec(false);
    setFileName("");
  };

  function showname() {
    var name = document.getElementById("fileInput");
    setFileName(name.files.item(0).name);
    if (!fileName) setEchec(false);
  }
  const handleClick = () => {
    if (!fileName) {
      setEchec(true);
      setMessage("Vous devez choisir un document pour le cértifier");
    } else setOpen(true);
  };

  return (
    <Container maxWidth="md">
      {open && (
        <Dialog
          title="Validation"
          content="Vérifier les informations avant de valider"
          open={open}
          setOpen={setOpen}
          handleAction={handleDialogAction}
        >
          {" "}
          <Typography variant="overline" display="block" gutterBottom>
            Cértifiez le document{" "}
            <span style={{ fontWeight: "bold" }}>{fileName}</span>{" "}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            Envoyez le document à{" "}
            <span style={{ fontWeight: "bold" }}>{row.original.Email}</span>{" "}
          </Typography>
        </Dialog>
      )}
      {success && (
        <SnackBar show={success} type="success" message={msgSuccess} />
      )}

      <SubSection>
        <Typography align="left" className={classes.title}>
          Cértifier et Envoyer{" "}
          <span style={{ color: "#4287f5" }}>un document</span>
        </Typography>

        <InlineInput>
          <TextField
            variant="outlined"
            placeholder="Vérifier un document"
            fullWidth
            size="small"
            value={fileName}
            disabled
          />
          <input
            accept="application/pdf"
            id="fileInput"
            multiple
            hidden
            type="file"
            onChange={showname}
          />
          <label htmlFor="fileInput">
            <Button
              component="span"
              color="#1651a2"
              className={classes.inputBtn}
            >
              <PublishIcon />
            </Button>
          </label>
          <Button
            color="#4cb69f"
            onClick={handleClick}
            className={classes.inputBtn}
          >
            <SendIcon />
          </Button>
        </InlineInput>
        <div className={classes.margin}>
          {echec && <Alert type={"error"} message={message} />}
        </div>
      </SubSection>
    </Container>
  );
}
