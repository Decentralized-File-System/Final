import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import companyLogo from "../Images/TeamShareLogo.png";
import Clock from "./Clock";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 90,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const pathName = history.location.pathname;
  return (
    <>
      {pathName === "/login" || pathName === "/signup" ? null : (
        <div id="header" className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Sidebar />
              <Typography className={classes.title} variant="h5" noWrap>
                <div className="clock-header">
                  <Clock />
                </div>
                <div className="logo">
                  <img src={companyLogo} width="100" height="60" />
                  Team-Share
                </div>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </>
  );
}
