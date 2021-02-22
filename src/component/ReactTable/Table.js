import React from "react";
import {
  useTable,
  useExpanded,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Pagging from "./Pagging";
import {
  fuzzyTextFilterFn,
  GlobalFilter,
  DefaultColumnFilter,
} from "./Filters";

//icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function Table({ columns: userColumns, data, renderRowSubComponent }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    state,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: userColumns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 5 },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    useExpanded, // We can useExpanded to track the expanded state
    usePagination
    // for sub components too!
  );

  const categoryFilter = React.useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      // console.log("row", row);
      options.add(row.original.Filiere);
    });
    return [...options.values()];
  }, [preGlobalFilteredRows]);

  return (
    <Paper style={{ padding: "2em", position: "relative", margin: "16px" }}>
      {/* <span style={{ marginRight: "10px" }}>Filter by category : </span> */}

      <GlobalFilter
        options={categoryFilter}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <TableContainer style={{ marginTop: "1em" }}>
        <MaUTable stickyHeader {...getTableProps()}>
          <TableHead style={{ cursor: "pointer" }}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{ background: "#F0F8FF" }}
                  >
                    <div
                      {...column.getSortByToggleProps()}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Typography noWrap style={{ fontWeight: 600 }}>
                        {" "}
                        {column.render("Header")}
                      </Typography>

                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        ) : !column.disableSortBy &&
                          column.id !== "expander" ? (
                          <UnfoldMoreIcon style={{ color: "#C0C0C0" }} />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <div style={{ marginTop: "8px" }}>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment key={rowProps.key}>
                  <TableRow {...rowProps}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/*
                      If the row is in an expanded state, render a row with a
                      column that fills the entire length of the table.
                    */}
                  {row.isExpanded ? (
                    <TableRow>
                      <TableCell colSpan={visibleColumns.length}>
                        {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                        {renderRowSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      {/* <div>Showing the first 20 results of {page.length} rows</div> */}
      <Pagging
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Paper>
  );
}

export default Table;
