import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import { Typography } from "@material-ui/core";

import Menu from "./Menu";

export default function SubSection({
  children,
  video,
  img,
  title,
  subtitle,
  order,
  center,
  ...rest
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
      justifyContent: "flex-start",
      [theme.breakpoints.down("sm")]: {
        margin: "16px 0",
        minHeight: "auto",
        alignItems: "center",
        order: order,
      },
    },
    center: {
      minHeight: "65vh",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      padding: "0",
      [theme.breakpoints.down("sm")]: {
        minHeight: "auto",
      },
    },
    video: {
      margin: "auto",
      width: "100%",
      borderRadius: "16px",
      boxShadow:
        "-9px 8px 13px -2px rgba(0,0,0,0.52) 11px -12px 13px -2px blue",
      WebkitBoxShadow: "-9px 8px 13px -2px rgba(0,0,0,0.52)",
    },
    main: {
      marginBottom: "40px",
    },
  }));

  const classes = useStyles();
  const root = classNames({
    [classes.root]: true,
    [classes.center]: center,
  });
  const content = classNames({
    [classes.video]: video,
  });

  return (
    <Grid item xs={12} md className={root} {...rest}>
      {video && <video src={video} autoPlay muted loop className={content} />}
      {title && (
        <div className={classes.main}>
          <Typography align="left" variant="h3">
            {title}
          </Typography>
          {subtitle && (
            <div style={{ marginTop: "40px" }}>
              <Menu list={subtitle} />
            </div>
          )}
        </div>
      )}
      {children}
    </Grid>
  );
}
