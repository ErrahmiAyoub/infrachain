import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

export default function CustomCardActions(props) {
  const { children, color, className, ...rest } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      background: color,
      color: "white",
      padding: ".5em 1em",
      "&:hover": {
        background: color,
        filter: "brightness(130%)",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Button
      className={classNames(classes.root, className)}
      variant="outlined"
      {...rest}
    >
      {children}
    </Button>
  );
}
