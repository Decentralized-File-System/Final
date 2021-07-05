import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { file } from "../types";
import File from "./File";
import { FileTableActions } from "./FileTableActions";
import TablePagination from "@material-ui/core/TablePagination";

type fileTableProps = {
  files: file[];
  getFiles: Function;
  setFiles: React.Dispatch<React.SetStateAction<file[]>>;
};

function FileTable({ files, getFiles, setFiles }: fileTableProps) {
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
              .map((file, i) => {
                return (
                  <File
                    getFiles={getFiles}
                    file={file}
                    index={i}
                    key={`${i}`}
                  />
                );
              })}
        </tbody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default FileTable;
