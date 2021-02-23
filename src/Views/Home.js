import React from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import video from "../assets/img/blockchain.mp4";
import Section from "../component/Section";
import SubSection from "../component/SubSection";
import Button from "../component/Button";
import Footer from "../component/Footer";
import Card from "../component/Card";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";

import SpeedIcon from "@material-ui/icons/Speed";
import EditIcon from "@material-ui/icons/Edit";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SecurityIcon from "@material-ui/icons/Security";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import StorageIcon from "@material-ui/icons/Storage";

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
}));

const subtitle = [
  "Signez ou certifiez les documents sur la blockchain",
  "Vérifiez intuitivement les documents",
  "Sécurité et confidentialité des documents",
];

export default function Home() {
  const classes = useStyles();

  const listItems = [{ href: "/verification", text: "Verifier" }];
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
          <SubSection
            main
            title="Signer, Certifier et Vérifier"
            subtitle={subtitle}
          >
            <div style={{ width: "100%", display: "flex" }}>
              <Link to="/login">
                <Button
                  color="#1651a2"
                  style={{ marginRight: "32px", padding: "8px 32px" }}
                >
                  Certifier
                </Button>
              </Link>
              <Link to="/verification">
                <Button
                  color="white"
                  style={{ color: "#1651a2", padding: "8px 32px" }}
                  variant="outlined"
                >
                  Verifier
                </Button>
              </Link>
            </div>
          </SubSection>
          <SubSection video={video} order={-1} />
        </Section>
        <Section back>
          <Grid item xs={12} className={classes.control}>
            <Typography align="left" variant="h4">
              Profitez des avantages uniques de notre solution basée sur la
              blockchain
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<NoEncryptionIcon fontSize="large" />}
              title="Blockchain sécurisé"
              desc="Rendez vos documents inviolables et protégez-les contre la fraude en signant leurs empreintes cryptographiques sur plusieurs nœuds de blockchain."
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<SpeedIcon fontSize="large" />}
              title="Vitesse améliorée et très efficace
              "
              desc="La rationalisation et l'automatisation des processus signifient également que tout devient très efficace et rapide."
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<SecurityIcon fontSize="large" />}
              title="Confidentialité dès la conception"
              desc="Une solution de confidentialité inégalée où tous vos documents peuvent être traités localement sur votre appareil.
              "
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<VerifiedUserIcon fontSize="large" />}
              title="Confiance vérifiable"
              desc="Vérifiez instantanément et intuitivement vos documents numériques un click."
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<StorageIcon fontSize="large" />}
              title="Données immuables "
              desc="Toutes les informations stockées dans la blockchain ne peuvent pas être modifiées"
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.control}>
            <Card
              icon={<EditIcon fontSize="large" />}
              title="Éliminer le
              risques de fraude
              "
              desc="Votre entreprise ne doit pas s'appuyer sur des faux certifications ou documents."
            />
          </Grid>
        </Section>

        <Section back dark>
          <SubSection
            main
            title="Nous vous aidons à mettre en œuvre la seule solution de certification et de vérification dont vous aurez besoin"
          ></SubSection>
          <SubSection
            main
            title="Certification"
            subtitle={subtitle}
          ></SubSection>
        </Section>
      </Container>
      <Footer text="Copyright © ENSIAS" />
    </React.Fragment>
  );
}
