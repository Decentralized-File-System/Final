import app, { httpLogs } from "./app";
import log4js from "log4js";
import { usersLogs } from "./controllers/usersController";
import { errorLogs } from "./controllers/fileController";

const logsConfiguration = {
  appenders: {
    access: { ...httpLogs.getConfiguration(), category: "http" },
    users: { ...usersLogs.getConfiguration(), category: "users" },
    errors: { ...errorLogs.getConfiguration(), category: "errors" },
  },
  categories: {
    default: { appenders: ["users"], level: "DEBUG" },
    http: { appenders: ["access"], level: "DEBUG" },
    errors: { appenders: ["errors"], level: "ERROR" },
  },
};

log4js.configure(logsConfiguration);

app.listen(3001, () => {
  console.log("app is listening in port 3001");
});

export { errorLogs, usersLogs, httpLogs };
