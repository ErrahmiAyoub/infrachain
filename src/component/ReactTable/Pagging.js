import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "40px",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Pagging = (props) => {
  const classes = useStyles();

  const {
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize,
  } = props;
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Grid className={classes.item} item xs={12} sm>
        <IconButton
          className={classes.margin}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          className={classes.margin}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          className={classes.margin}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          className={classes.margin}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <LastPageIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md className={classes.item}>
        <span className={classes.margin}>
          Page{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <span className={classes.margin}>| Go to page: </span>
        <TextField
          className={classes.margin}
          InputProps={{ inputProps: { min: 1, max: pageOptions.length } }}
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: 150 }}
          variant="outlined"
          size="small"
          label="Page"
        />
      </Grid>
      <Grid item xs={12} sm className={classes.item}>
        <Autocomplete
          id="filterPage"
          options={[5, 10, 20, 30]}
          size="small"
          getOptionLabel={(option) => `Afficher ${option}`}
          style={{ width: 200 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Taille de la page"
              variant="outlined"
            />
          )}
          value={pageSize}
          onChange={(e, v) => {
            if (Number(v)) setPageSize(Number(v));
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Pagging;
