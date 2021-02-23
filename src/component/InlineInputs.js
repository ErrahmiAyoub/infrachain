import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  inputDiv: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "16px 0",
    "& *": {
      borderRadius: "0",
    },
  },
}));

export default function InlineInput({ children }) {
  const classes = useStyles();

  return <div className={classes.inputDiv}>{children}</div>;
}
