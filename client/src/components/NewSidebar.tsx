import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useData } from "../context/AppDataContext";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { BASE_URL } from "../Utils/Variables";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   position: "relative",
      //   display: "flex",
    },
    drawer: {
      //   width: drawerWidth,
      //   flexShrink: 0,
    },
    drawerPaper: {
      top: "inherit",
      [theme.breakpoints.down("sm")]: {
        width: "7.5%",
      },
      [theme.breakpoints.up("md")]: {
        width: "12%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "12%",
      },
    },
  })
);

export default function PermanentDrawerLeft() {
  const { currentPage, setCurrentPage } = useData();
  const history = useHistory();
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1100px)");

  const navigateHandler = (destination: string) => {
    console.log(destination);
    setCurrentPage(destination);
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes.root} sideBar`}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        <List>
        <ListItem button key={"Tasks"} onClick={() => navigateHandler("tasks")}>
          <span style={{ display: "flex" }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Tasks"} />
          </span>
        </ListItem>
        <ListItem button key={"Files"} onClick={() => navigateHandler("files")}>
          <span style={{ display: "flex" }}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Files"} />
          </span>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText onClick={logoutHandler} primary={"Logout"} />
        </ListItem>
      </List>
      </Drawer>
    </div>
  );
}
