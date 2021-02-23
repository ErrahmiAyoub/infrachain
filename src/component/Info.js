import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  info: {
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: "9",
    display: "flex",
    alignItems: "flex-start",
  },
  explain: {
    padding: "16px",
    background: "#e1f5fe",
    borderRadius: "10px",
  },

  icon: {
    color: "#1651a2",
  },
}));

export default function Info({ titre, text, list }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.info}>
      {open && (
        <div style={{ display: "flex" }}>
          <div className={classes.explain}>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              {titre}
            </Typography>
            <Typography>{text}</Typography>
            {list && <Menu list={list} />}
          </div>
          <div className={classes.triangle}></div>
        </div>
      )}
      <IconButton onClick={() => setOpen(!open)}>
        <InfoIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}
