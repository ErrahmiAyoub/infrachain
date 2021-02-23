import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
// import IconButton from "@material-ui/core/IconButton";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import StoreIcon from "@material-ui/icons/Store";
import { SelectColumnFilter } from "../../component/ReactTable/Filters";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import EmailIcon from "@material-ui/icons/Email";
// import IconButton from "@material-ui/core/IconButton";

export default function tableColumns() {
  return [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: "expander", // It needs an ID
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? <RemoveIcon /> : <AddIcon />}
        </span>
      ),
    },

    {
      Header: "CNE",
      accessor: (d) => d.CNE,
    },
    {
      Header: "Nom complet",
      accessor: (d) => d.Nom + " " + d.Prenom,
    },
    {
      Header: "Email",
      accessor: (d) => d.Email,
    },
    {
      Header: "Telephone",
      accessor: (d) => d.Tele,
    },
    {
      Header: "CIN",
      accessor: (d) => d.CIN,
    },
    {
      Header: "Filière",
      accessor: (d) => d.Filiere,
      Filter: SelectColumnFilter,
    },
    // {
    //   Header: <AttachFileIcon />,
    //   accessor: "file",
    //   disableSortBy: true,
    //   Cell: () => (
    //     <IconButton
    //       aria-label="email"
    //       size="small"
    //       style={{ padding: "8px", background: "#1651a2" }}
    //       onClick={() => {
    //         setOpen(true);
    //       }}
    //     >
    //       <EmailIcon style={{ color: "#fff" }} fontSize="small" />
    //     </IconButton>
    //   ),

    //   Filter: () => null,
    // },
  ];
}
