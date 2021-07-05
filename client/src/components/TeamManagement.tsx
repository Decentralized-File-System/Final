import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";
import { useAuth } from "../context/AuthContext";
import { user } from "../types";
import { TeamMemberTab } from "./TeamMemberTab";
import Button from "react-bootstrap/esm/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "50rem",
    margin: "2rem auto 0 auto",
  },
}));

export const TeamManagement = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [teamMembers, setTeamMembers] = useState<user[]>();
  const [freeEmployees, setFreeEmployees] = useState<user[]>();
  const { currentUser, setCurrentUser } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const getTeamMembers = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/employees?teamId=${currentUser.teamId}`,
        { user: currentUser },
        {
          withCredentials: true,
        }
      );
      setTeamMembers(res.data.usersArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getFreeEmployees = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/employees?teamId=none`,
        { user: currentUser },
        {
          withCredentials: true,
        }
      );
      setFreeEmployees(res.data.usersArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamMembers();
    getFreeEmployees();
  }, []);

  const removeMember = async (user: user) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/user/change-props?teamId=${null}`,
        [user],
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addMember = async (user: user) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/user/change-props?teamId=${currentUser.teamId}`,
        [user],
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshButton = () => {
    getTeamMembers();
    getFreeEmployees();
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const changeNameHandler = async () => {
    const tempUser = Object.assign({}, currentUser);
    tempUser.teamId = inputRef.current?.value;
    try {
      await axios.put(
        `${BASE_URL}/user/change-team-id`,
        {
          oldId: currentUser.teamId,
          newId: inputRef.current?.value,
          isAdmin: currentUser.isAdmin,
        },
        {
          withCredentials: true,
        }
      );
      setCurrentUser(tempUser);
      swal.fire({
        title: "✔",
        text: "Changed Id",
        timer: 3000,
        showConfirmButton: true,
      });
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: "Failed To Change",
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="My team" {...a11yProps(0)} />
          <Tab label="Add member" {...a11yProps(1)} />
          <Tab label="Edit Team Id" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Remove member</th>
              <th onClick={() => refreshButton()}>
                <RefreshIcon className="refresh-button" />
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers &&
              teamMembers.map((member: user, i: number) => (
                <TeamMemberTab
                  user={member}
                  key={i}
                  index={i}
                  removeMember={removeMember}
                  addMember={undefined}
                />
              ))}
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Add member</th>
              <th onClick={() => refreshButton()}>
                <RefreshIcon className="refresh-button" />
              </th>
            </tr>
          </thead>
          <tbody>
            {freeEmployees &&
              freeEmployees.map((member: user, i: number) => (
                <TeamMemberTab
                  user={member}
                  key={i}
                  index={i}
                  removeMember={undefined}
                  addMember={addMember}
                />
              ))}
          </tbody>
        </table>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="change-team-div">
          <input ref={inputRef} type="text" placeholder={currentUser.teamId} />
          <Button onClick={changeNameHandler}>Change Name</Button>
        </div>
      </TabPanel>
    </div>
  );
};
