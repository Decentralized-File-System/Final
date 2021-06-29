import React from "react";
import { file } from "./EmployeeDashboard";

type fileType = {
  file: file;
  index: number;
};

const File = ({ file,index }: fileType) => {
  return(
    <tr>
      <td>{index +1}</td>
      <td>{file.name}</td>
      <td>{file.userId}</td>
      <td>{file.size}</td>
      <td>{file.type}</td>
      <td>{new Date(file.createdAt).toDateString()}</td>
    </tr>
  ) 
};

export default File;
