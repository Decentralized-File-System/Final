import React from "react";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { BASE_URL } from "../Utils/Variables";
import { useHistory } from "react-router-dom";
import { ColorLensOutlined } from "@material-ui/icons";
import { useData } from "../context/AppDataContext";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(-1.2),
    color: "white",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

type Anchor = "right";

export default function Sidebar() {
  const { currentPage, setCurrentPage } = useData();
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const logoutHandler = async () => {
    try {
      await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navigateHandler = (destination: string) => {
    console.log(destination);
    setCurrentPage(destination);
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"Tasks"}>
          <span
            style={{ display: "flex" }}
            onClick={() => navigateHandler("tasks")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Tasks"} />
          </span>
        </ListItem>
        <ListItem button key={"Files"}>
          <span
            style={{ display: "flex" }}
            onClick={() => navigateHandler("files")}
          >
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
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
