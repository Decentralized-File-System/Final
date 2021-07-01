import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import companyLogo from "../Images/1440x1440Logo.png";
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
const headerStyle = {
  background: "#4DA8DA",
};

export default function Header() {
  const classes = useStyles();
  return (
    <div id="header" className={classes.root} style={{ background: "#555" }}>
      <AppBar position="static" className="header-bar" style={headerStyle}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            <div className="clock-header">{/* <Clock /> */}</div>
            <div className="logo">
              <img
                src={companyLogo}
                width="70"
                height="70"
                style={{ margin: "0", padding: "0" }}
                alt="logo"
              />
            </div>
          </Typography>
          <Sidebar />
        </Toolbar>
      </AppBar>
    </div>
  );
}
