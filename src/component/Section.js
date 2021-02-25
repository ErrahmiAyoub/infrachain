import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

export let useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    minHeight: "85vh",
    padding: "60px",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: "0 8px",
      margin: 0,
    },
  },
  dark: {
    "& * ": {
      color: "#fff",
    },
  },
  back: {
    position: "absolute",
    height: "100%",
    left: "-50%",
    width: "200%",
    zIndex: "-5",
    transform: "rotate(-3deg)",
  },
  vid: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    zIndex: "-2",
  },
  font: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "-1",
    background: "rgb(255,255,255,.2)",
  },
}));

export default function Section(props) {
  const { children, dark, back, video, ...rest } = props;
  const classes = useStyles();
  const root = classNames({
    [classes.root]: true,
    [classes.dark]: dark,
  });

  const background = dark ? "#0c3475" : "#F4F1EE";
  return (
    <div className={root} {...rest}>
      {back && (
        <div className={classes.back} style={{ background: background }}>
          {""}
        </div>
      )}
      {video && (
        <>
          <video src={video} autoPlay muted loop className={classes.vid} />
          <div className={classes.font}></div>
        </>
      )}
      <Grid container justify="space-between" alignItems="flex-start">
        {children}
      </Grid>
    </div>
  );
}
