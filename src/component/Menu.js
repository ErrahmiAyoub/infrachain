import React from "react";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  root: {
    padding: "0 8px",
    wordWrap: "break-word",
    pointerEvents: "none",
  },
  item: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "8px 0",
    textAlign: "left",
    lineHeight: "1.6",
  },
});

export default function TypographyMenu({ list }) {
  const classes = useStyles();

  const listItems = list.map((obj, key) => {
    return (
      <li key={key} className={classes.item}>
        <ListItemIcon>
          {" "}
          <CheckCircleIcon fontSize="small" style={{ color: "green" }} />
        </ListItemIcon>
        <Typography variant="inherit">{obj}</Typography>
      </li>
    );
  });

  return (
    <div className={classes.root}>
      <MenuList>{listItems}</MenuList>
    </div>
  );
}
