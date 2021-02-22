import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  icon: {
    background: "#d7e1e1",
    borderRadius: "1em",
    margin: 0,
    pointerEvents: "none",
  },
  text: {
    textAlign: "left",
  },
  title: {
    fontWeight: 700,
    fontSize: "16px",
  },
  desc: {
    color: "#707070",
  },
}));

export default function CustomCardContent({ icon, title, desc }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <IconButton className={classes.icon}>{icon}</IconButton>
      </Grid>
      <Grid item xs={9} className={classes.control}>
        <Typography
          className={classNames(classes.text, classes.title, "typographie")}
          variant="h6"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.control}>
        <Typography
          className={classNames(classes.text, classes.desc, "typographie")}
        >
          {desc}
        </Typography>
      </Grid>
    </Grid>
  );
}
