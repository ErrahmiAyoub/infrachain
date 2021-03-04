import React from "react";
import { useStyles } from "../assets/jss/AlertStyle";
import { Alert, AlertTitle } from "@material-ui/lab";
// import { Typography } from "@material-ui/core";

export default function SimpleAlerts({
  serverError,
  type,
  message,
  title,
  ...rest
}) {
  const classes = useStyles();
  let list = [];
  if (message && typeof message === "object") {
    for (const [key, value] of Object.entries(message)) {
      list.push(
        <li key={key}>
          <strong>{key.replaceAll("_", " ")} :</strong> {value}
        </li>
      );
    }
  }

  return (
    <div className={classes.root}>
      <Alert severity={type} {...rest} style={{ textAlign: "left" }}>
        {serverError && (
          <AlertTitle>
            <strong>Error 503</strong>
          </AlertTitle>
        )}
        {title && (
          <AlertTitle>
            <strong>{title}</strong>
          </AlertTitle>
        )}
        {typeof message === "object" ? list : message}
      </Alert>
    </div>
  );
}
