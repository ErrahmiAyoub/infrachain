/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import logo from "../assets/img/logo.PNG";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "../component/MenuItem";
import classNames from "classnames";

import { useStyles } from "../assets/jss/NavbarStyle";
import { Link } from "react-router-dom";

export default function ButtonAppBar({ children, listItems, transparent }) {
  const classes = useStyles();

  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updateWindowDimensions = () => {
      if (window.innerWidth < 900) setMobile(true);
      else {
        setMobile(false);
        setActive(false);
      }
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const root = classNames({
    [classes.root]: true,
    [classes.transparent]: transparent,
  });

  return (
    <div className={root}>
      <Toolbar className={classes.toolbar}>
        {mobile && listItems && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{ color: "#1651a2" }}
            aria-label="menu"
            onClick={() => setActive(!active)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>

        <div className={classes.toolbar}>
          {!mobile && listItems && <MenuItem items={listItems} horizontal />}
          {children}
        </div>
      </Toolbar>
      {active && listItems && <MenuItem items={listItems} />}
    </div>
  );
}
