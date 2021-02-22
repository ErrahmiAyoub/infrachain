import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Button from "../component/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  text: {
    marginBottom: "30px",
    color: "#707070",
  },
  link: {
    padding: "8px 16px",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "18px",
  },
  icon: {
    fontSize: "80px",
    animation: "fa-spin 2s infinite linear",
  },
  button: {
    margin: "40px 16px 16px 16px",
  },
}));

export default function NotFoundPage() {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <Typography variant="h2" className={classes.text}>
        Aïe ! Cette page est introuvable
      </Typography>
      <Typography variant="overline">
        Il semble que rien ne soit trouvé ici. Essayez un des liens à gauche ou
        retourner à la page d'accueil
      </Typography>

      <Button color="white" size="large" className={classes.button}>
        <Link to="/" className={classes.link}>
          Page d'accueil
        </Link>
      </Button>
    </div>
  );
}
