import React, { useState } from "react";
import { task } from "../types";
import {
  sortByTitleTask,
  sortByStatusTask,
  sortByDateTask,
  sortByDeadlineTask,
} from "../Utils/sortsFunctions";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/AppDataContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);

export const TaskTableActions = () => {
  const { tasks, getTasks, setTasks } = useData();
  const [searchClass, setSearchClass] = useState("search-input hidden");
  const { currentUser } = useAuth();
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let temp;
    switch (e.target.value) {
      case "Title":
        temp = sortByTitleTask(tasks);
        setTasks(temp);
        break;
      case "Status":
        temp = sortByStatusTask(tasks);
        setTasks(temp);
        break;
      case "Uploaded at":
        temp = sortByDateTask(tasks);
        setTasks(temp);
        break;
      case "Deadline at":
        temp = sortByDeadlineTask(tasks);
        setTasks(temp);
        break;
      default:
        break;
    }
  };

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value !== "") {
        const res = await axios.get(
          `${BASE_URL}/task/task-by-name?text=${e.target.value}&teamId=${currentUser.teamId}`,
          { withCredentials: true }
        );
        setTasks(res.data);
      } else {
        getTasks();
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
          defaultValue="Deadline at"
        >
          <option value="Title">Title</option>
          <option value="Status">Status</option>
          <option value="Uploaded at">Uploaded at</option>
          <option value="Deadline at">Deadline at</option>
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
