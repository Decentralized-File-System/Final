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
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import { useData } from "../context/AppDataContext";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const swal = withReactContent(Swal);

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
  const { setCurrentPage, setFiles, setTasks } = useData();
  const { logout, currentUser, setCurrentUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const navigateHandler = (destination: string) => {
    setCurrentPage(destination);
  };

  const logoutHandler = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setFiles([]);
      setTasks([]);
      setCurrentPage("dashboard");
      history.push("/login");
    } catch (error) {
      swal.fire({
        title: "Attention!",
        text: error.response.data.message,
        timer: 3000,
        showConfirmButton: true,
      });
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
            key={"Dashboard"}
            onClick={() => navigateHandler("dashboard")}
          >
            <span style={{ display: "flex" }}>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </span>
          </ListItem>
          {!currentUser.isSuperAdmin ? (
            <>
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
            </>
          ) : null}
          {currentUser.isAdmin ? (
            <ListItem
              button
              key={"Team management"}
              onClick={() => navigateHandler("teamManagement")}
            >
              <span style={{ display: "flex" }}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    !currentUser.isSuperAdmin
                      ? "Team management"
                      : "Admin management"
                  }
                />
              </span>
            </ListItem>
          ) : null}
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
