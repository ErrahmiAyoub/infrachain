import React, { useEffect, useState } from "react";
import Table from "../../component/ReactTable/Table";
import Dialog from "../../component/FormDialog";
import SnackBar from "../../component/SnackBar";
import tableColumns from "./TableColumns";
import SubComponent from "./SubComponent";
import ProgressBar from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import student from "../../students.json";
import Navbar from "../../component/Navbar";
import Button from "../../component/Button";
import { logout } from "../../routes/utils";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [studentList, setStudentList] = useState(null);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    setStudentList(student);
    setLoading(false);
  }, []);

  const columns = React.useMemo(() => tableColumns(), []);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => <SubComponent row={row} />,
    []
  );

  return (
    <>
      <Navbar>
        <Link to="/">
          <Button color="#1651a2" onClick={logout}>
            Deconnexion
          </Button>
        </Link>
      </Navbar>
      {!loading ? (
        <Table
          columns={columns}
          data={studentList}
          renderRowSubComponent={renderRowSubComponent}
        />
      ) : (
        !error && <ProgressBar />
      )}

      {error && (
        <Alert style={{ marginTop: "40px" }} severity="info">
          Erreur
        </Alert>
      )}
    </>
  );
}

export default Home;
