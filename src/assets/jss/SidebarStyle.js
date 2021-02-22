import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 270;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    overflowX: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 60,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },


  content: {
    flexGrow: 1,
    minHeight: "100vh",
    "& .nav": {
      background: "red",
      position: "fixed"
    }
  },
  maxOpen: {
    maxWidth: `calc(100% - ${drawerWidth}px)`,
  },
  maxClose: {
    maxWidth: `calc(100% - 60px)`,
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  linkText: {
    paddingLeft: "32px",
    fontWeight: "900",
    whiteSpace: "pre-wrap",
    //textShadow: "#fff 0px 0px 1px,#fff 0px 0px 1px,#fff 0px 0px 1px, #fff 0px 0px 1px,#fff 0px 0px 1px,#fff 0px 0px 1px;",
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    height: "60px",
    margin: "auto"
  },
}));