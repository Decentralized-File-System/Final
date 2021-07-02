import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SettingsIcon from "@material-ui/icons/Settings";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useData } from "../context/AppDataContext";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../context/AuthContext";

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
  const { logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1100px)");

  const navigateHandler = (destination: string) => {
    console.log(destination);
    setCurrentPage(destination);
  };

  const logoutHandler = async () => {
    try {
      await logout();
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
          <ListItem
            button
            key={"Tasks"}
            onClick={() => navigateHandler("tasks")}
          >
            <span style={{ display: "flex" }}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Tasks"} />
            </span>
          </ListItem>
          <ListItem
            button
            key={"Files"}
            onClick={() => navigateHandler("files")}
          >
            <span style={{ display: "flex" }}>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary={"Files"} />
            </span>
          </ListItem>
          <ListItem
            button
            key={"Settings"}
            onClick={() => navigateHandler("settings")}
          >
            <span style={{ display: "flex" }}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </span>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
