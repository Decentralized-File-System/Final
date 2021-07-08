import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { file } from "../types";
import File from "./File";
import { FileTableActions } from "./FileTableActions";
import TablePagination from "@material-ui/core/TablePagination";
import { useData } from "../context/AppDataContext";
import { Progress } from "reactstrap";

export type fileTableType = {
  loaded: number;
  showBar: boolean;
  setLoaded: Function;
  setShowBar: Function;
};

function FileTable({ loaded, showBar, setLoaded, setShowBar }: fileTableType) {
  const { files, setFiles, getFiles, filesError } = useData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="fileTable-container">
      <FileTableActions files={files} setFiles={setFiles} getFiles={getFiles} />
      <Table striped bordered hover size="sm" className="file-Table">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>User</th>
            <th>Size</th>
            <th>Extension</th>
            <th>Uploaded at</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {files &&
            files
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((file: file, i: number) => {
                return (
                  <File
                    file={file}
                    index={i}
                    key={`${i}`}
                    setLoaded={setLoaded}
                    setShowBar={setShowBar}
                  />
                );
              })}
        </tbody>
      </Table>
      <div className="error-div">{filesError ? "Failed to get files" : ""}</div>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div>
        {showBar && (
          <>
            <div>
              {Math.round(loaded) === 100 ? (
                <>
                  Finishing upload<span className="dot-1">.</span>
                  <span className="dot-2">.</span>
                  <span className="dot-3">.</span>
                </>
              ) : Math.round(loaded) === 0 ? (
                <>
                  Preparing to download<span className="dot-1">.</span>
                  <span className="dot-2">.</span>
                  <span className="dot-3">.</span>
                </>
              ) : (
                ""
              )}
            </div>
            <Progress max="100" color="success" value={loaded}>
              {Math.round(loaded)}%
            </Progress>
          </>
        )}
      </div>
    </div>
  );
}

export default FileTable;
