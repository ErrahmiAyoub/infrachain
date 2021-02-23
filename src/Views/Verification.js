import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

// import video from "../assets/img/blockchain.mp4";
import Section from "../component/Section";
import Button from "../component/Button";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import SubSection from "../component/SubSection";
import Info from "../component/Info";
import Alert from "../component/Alert";
import InlineInput from "../component/InlineInputs";

import { Link } from "react-router-dom";
import file from "../assets/img/file.svg";

import PublishIcon from "@material-ui/icons/Publish";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
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

export default function Verification() {
  const classes = useStyles();
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [echec, setEchec] = useState(false);

  let etat = success || echec;

  const listItems = [{ href: "/verification", text: "Verifier" }];
  function showname() {
    var name = document.getElementById("fileInput");
    setFileName(name.files.item(0).name);
  }
  const handleClick = () => {
    setMessage("Le document est valide");
    if (fileName) setSuccess(true);
    else {
      setEchec(true);
      setMessage("Vous devez choisir un document");
    }
  };
  const list = [
    "Ajoutez un document depuis votre ordinateur",
    "Cliquez sur le bouton envoyer pour vérifier si le fichier est valide",
    "Le résultat va s'afficher sur la même page",
  ];

  return (
    <React.Fragment>
      <Navbar listItems={listItems}>
        {" "}
        <Link to="/login">
          <Button color="#1651a2">Certifer</Button>
        </Link>
      </Navbar>
      <CssBaseline />

      <Container className={classes.root}>
        <Info titre="Comment verifier un document ?" list={list} />
        <Section>
          <SubSection center>
            <img src={file} alt="file" style={{ width: "80%" }}></img>
          </SubSection>
          <SubSection center>
            <Typography align="left" className={classes.title}>
              Télécharger et vérifier{" "}
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
              {etat && (
                <Alert type={success ? "success" : "error"} message={message} />
              )}
            </div>
          </SubSection>
        </Section>
      </Container>
      <Footer text="Copyright © ENSIAS" />
    </React.Fragment>
  );
}
