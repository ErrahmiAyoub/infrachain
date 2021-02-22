import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export let useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    position: "relative",
    bottom: "0",
  },
  text: {
    color: "#000",
  },
}));

export default function Footer({ text }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.text}>{text}</p>
    </div>
  );
}
