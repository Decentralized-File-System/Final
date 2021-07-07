import React, { useState } from "react";
import { file, task } from "../types";
import {
  sortByName,
  sortByUser,
  sortBySize,
  sortByExtension,
  sortByDate,
} from "../Utils/sortsFunctions";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);

type tableActionsProps = {
  files: file[];
  setFiles: React.Dispatch<React.SetStateAction<file[]>>;
  getFiles: Function;
};

export const FileTableActions: React.FC<tableActionsProps> = ({
  files,
  setFiles,
  getFiles,
}) => {
  const [searchClass, setSearchClass] = useState("search-input hidden");
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
    try {
      if (e.target.value !== "") {
        const res = await axios.get(
          `${BASE_URL}/file/file-by-name?text=${e.target.value}&teamId=${currentUser.teamId}`,
          { withCredentials: true }
        );
        setFiles(res.data);
      } else {
        getFiles();
      }
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  const debouncedChangeHandler = debounce(search, 500);

  const searchClick = () => {
    setSearchClass(
      searchClass === "search-input hidden"
        ? "search-input"
        : "search-input hidden"
    );
  };

  return (
    <div className="table-actions">
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
      </div>
      <div className="search-div">
        <input
          type="text"
          placeholder="Search..."
          onChange={debouncedChangeHandler}
          className={searchClass}
        />
        <button className="search-button" onClick={searchClick}>
          <SearchIcon id="search-icon" />
        </button>
      </div>
    </div>
  );
};
