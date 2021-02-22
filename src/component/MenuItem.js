import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    // display: "none",
    // [theme.breakpoints.down("sm")]: {
    //   display: "flex",
    // },
  },
  title: {
    flexGrow: 1,
    fontFamily: "Lato",
    fontWeight: 500,
  },
  toolbar: {
    background: "#fff",
    color: "#000",
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
  },
  logo: {
    height: "70px",
  },
  items: {
    display: "flex",
    alignItems: "center",
    "& .title": {
      marginRight: "5vw",
    },
  },
  link: {
    color: "black",
    "& :hover": {
      color: "#1651a2",
    },
  },
  list: {
    margin: "16px",
  },
  paper: {
    background: "#1651a2",
    "& *": {
      color: "white",
      "& :hover": {
        color: "#efefef",
      },
    },
  },
}));

export default function MenuItem({ items, horizontal }) {
  const classes = useStyles();

  const itemList = classNames({
    [classes.title]: horizontal,
    title: horizontal,
    [classes.list]: !horizontal,
  });

  const list = items.map((obj, key) => {
    return (
      <Link key={key} to={obj.href} className={classes.link}>
        {!horizontal && <Divider />}
        <Typography variant="h6" className={itemList}>
          {obj.text}
        </Typography>
      </Link>
    );
  });

  return (
    <>
      {horizontal ? (
        <div className={classes.items}>{list}</div>
      ) : (
        <Paper className={classes.paper}>
          {list} <Divider />{" "}
        </Paper>
      )}
    </>
  );
}
