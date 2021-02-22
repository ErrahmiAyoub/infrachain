import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// import video from "../assets/img/blockchain.mp4";
import Section from "../component/Section";
import Button from "../component/Button";
import Footer from "../component/Footer";

import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import SubSection from "../component/SubSection";

import file from "../assets/img/file.svg";

import PublishIcon from "@material-ui/icons/Publish";
import CheckIcon from "@material-ui/icons/Check";
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

  const listItems = [{ href: "/verification", text: "Verifier" }];
  function showname() {
    var name = document.getElementById("fileInput");
    setFileName(name.files.item(0).name);
  }
  const handleClick = () => {
    setMessage("Le document est valide");
  };

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
        <Section>
          <SubSection>
            <img src={file} alt="file" style={{ width: "100%" }}></img>
          </SubSection>
          <SubSection
            style={{
              height: "65vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className={classes.inputDiv}>
              <TextField
                variant="outlined"
                placeholder="Télécharger votre fichier"
                fullWidth
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
                startIcon={<CheckIcon />}
                onClick={handleClick}
              >
                Valider
              </Button>
            </div>
            <div className={classes.margin}>
              <Typography> {message} </Typography>
            </div>
          </SubSection>
        </Section>
      </Container>
      <Footer text="Copyright © ENSIAS" />
    </React.Fragment>
  );
}
