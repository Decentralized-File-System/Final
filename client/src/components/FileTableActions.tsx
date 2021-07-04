import React, { useCallback } from "react";
import { file, task } from "../types";
import {
  sortByName,
  sortByUser,
  sortBySize,
  sortByExtension,
  sortByDate,
} from "../Utils/sortsFunctions";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import debounce from "lodash.debounce";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";

type tableActionsProps = {
  files: file[];
  setFiles: React.Dispatch<React.SetStateAction<file[]>>;
  getFiles: Function;
  tasks?: task[];
  setTasks?: React.Dispatch<React.SetStateAction<task[]>>;
  getTasks?: Function;
};

export const FileTableActions: React.FC<tableActionsProps> = ({
  files,
  setFiles,
  getFiles,
}) => {
  const { currentUser } = useAuth();
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

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length > 0) {
      if (e.target.value !== "") {
        const res = await axios.get(
          `${BASE_URL}/file/file-by-name?text=${e.target.value}&teamId=${currentUser.teamId}`,
          { withCredentials: true }
        );
        setFiles(res.data);
      } else {
        getFiles();
      }
    }
  };

  const debouncedChangeHandler = useCallback(debounce(search, 500), []);

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        name="sort"
        onChange={(e) => handleSort(e)}
        defaultValue="Uploaded at"
      >
        <option value="File Name">File Name</option>
        <option value="User">User</option>
        <option value="Size">Size</option>
        <option value="Extension">Extension</option>
        <option value="Uploaded at">Uploaded at</option>
      </select>
      <input type="text" onChange={debouncedChangeHandler} />
      <SearchIcon />
    </div>
  );
};
