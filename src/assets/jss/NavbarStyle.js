import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    zIndex: "10",
    background: "rgb(255,255,255)",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  },

  transparent: {
    background: "rgb(0,0,0, .1)",
    "& *": {
      color: "#fff",
    },
  },

  toolbar: {
    color: "#000",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px 0",
  },
  logo: {
    height: "70px",
  },
}));
