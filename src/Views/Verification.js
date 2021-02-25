import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Mbutton from "@material-ui/core/Button";

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
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import GetAppIcon from "@material-ui/icons/GetApp";

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
  const [fileName, setFileName] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [echec, setEchec] = useState(false);
  const [hash, setHash] = useState(false);

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
  const handleClickHash = () => {
    setMessage("Le hash est valide . Vous pouvez télécharger le document");
    if (fileHash) setSuccess(true);
    else {
      setEchec(true);
      setSuccess(false);
      setMessage("Vous devez choisir un document");
    }
  };

  const list = [
    !hash
      ? "Ajoutez un document depuis votre ordinateur"
      : "Saisisez le hash du document à vérifié",
    "Cliquez sur le bouton envoyer pour vérifier si le document est valide",
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
        <div style={{ position: "sticky", top: "100px", zIndex: 15 }}>
          <Info titre="Comment verifier un document ?" list={list} />
          <Mbutton
            startIcon={<SwapHorizIcon />}
            variant="outlined"
            onClick={() => {
              setHash(!hash);
              setSuccess(false);
              setEchec(false);
            }}
            color="primary"
          >
            {hash ? "Vérifier par document" : "Vérifier par Hash"}
          </Mbutton>
        </div>
        <Section style={{ minHeight: "auto" }}>
          <SubSection center>
            <img src={file} alt="file" style={{ width: "80%" }}></img>
          </SubSection>
          {!hash ? (
            <SubSection center>
              <Typography align="left" className={classes.title}>
                {"Vérifier par "}
                <span style={{ color: "#4287f5" }}>DOCUMENT</span>
              </Typography>

              <InlineInput>
                <TextField
                  id="doc"
                  variant="outlined"
                  placeholder="Choisir un document"
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
                  <Alert
                    type={success ? "success" : "error"}
                    message={message}
                  />
                )}
              </div>
            </SubSection>
          ) : (
            <SubSection center>
              <Typography align="left" className={classes.title}>
                Vérifier par <span style={{ color: "#4287f5" }}>HASH</span>
              </Typography>

              <InlineInput>
                <TextField
                  id="hash"
                  variant="outlined"
                  placeholder="Saisir le hash"
                  fullWidth
                  size="small"
                  value={fileHash}
                  onChange={(e) => setFileHash(e.target.value)}
                />
                <Button
                  color="#4cb69f"
                  onClick={handleClickHash}
                  className={classes.inputBtn}
                >
                  <SendIcon />
                </Button>
                <Mbutton
                  color="primary"
                  style={{ padding: "8px 0" }}
                  className={classes.inputBtn}
                  disabled={!success}
                >
                  <GetAppIcon />
                </Mbutton>
              </InlineInput>
              <div className={classes.margin}>
                {etat && (
                  <Alert
                    type={success ? "success" : "error"}
                    message={message}
                  />
                )}
              </div>
            </SubSection>
          )}
        </Section>
      </Container>
      <Footer text="Copyright © ENSIAS" />
    </React.Fragment>
  );
}
