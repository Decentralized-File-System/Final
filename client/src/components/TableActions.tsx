import React from "react";
import { file } from "../types";
import {
  sortByName,
  sortByUser,
  sortBySize,
  sortByExtension,
  sortByDate,
} from "../Utils/sortsFunctions";

type tableActionsProps = {
  files: file[];
  setFiles: React.Dispatch<React.SetStateAction<file[]>>;
};

export const TableActions: React.FC<tableActionsProps> = ({
  files,
  setFiles,
}) => {
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let temp;
    switch (e.target.value) {
      case "File Name":
        temp = sortByName(files);
        setFiles(temp);
        break;

      case "User":
        temp = sortByUser(files);
        setFiles(temp);
        break;

      case "Size":
        temp = sortBySize(files);
        setFiles(temp);
        break;

      case "Extension":
        temp = sortByExtension(files);
        setFiles(temp);
        break;

      case "Uploaded at":
        temp = sortByDate(files);
        setFiles(temp);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" name="sort" onChange={(e) => handleSort(e)}>
        <option value="File Name">File Name</option>
        <option value="User">User</option>
        <option value="Size">Size</option>
        <option value="Extension">Extension</option>
        <option value="Uploaded at" selected>
          Uploaded at
        </option>
      </select>
    </div>
  );
};
