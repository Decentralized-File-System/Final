import log4js from "log4js";

type ConfigurationObj = {
  type: string;
  filename: string;
  maxLogSize: number;
  backups: number;
  compress: boolean;
};

export class Logger {
  // in log4js you cant name your backup files, it takes the original file name.
  // private backupFileNameAndLibrary: string;
  constructor(
    private isCompressed: boolean,
    // number of backups: the number of old log files to keep during log rolling. (if the number is 3 for example, there will always be 3 backups for the last 3 log files that reached max log size)
    private numberOfBackups: number,
    private fileNameAndLibrary: string
  ) {
    this.isCompressed = isCompressed;
    this.numberOfBackups = numberOfBackups;
    this.fileNameAndLibrary = fileNameAndLibrary;
  }

  // return the necessary configurations for the log4js.configure function.
  getConfiguration(): ConfigurationObj {
    return {
      type: "file",
      filename: this.fileNameAndLibrary,
      maxLogSize: 10485760,
      backups: this.numberOfBackups,
      compress: this.isCompressed,
    };
  }

  // return a Logger object from log4js.getLogger function. this object will be used to write into the log file.
  getLogger(name?: string): log4js.Logger {
    if (name) {
      return log4js.getLogger(name);
    } else return log4js.getLogger();
  }

  // return Logger that connect to the express server and write all the requests to a file.
  connectLogger(): log4js.Logger {
    return log4js.connectLogger(log4js.getLogger("http"), { level: "auto" });
  }
}

export class ErrorLogs extends Logger {
  constructor() {
    super(false, 0, "logs/errorLogs.log");
  }
}

export class UsersLogs extends Logger {
  constructor(fileNameAndLibrary: string) {
    super(false, 3, fileNameAndLibrary);
  }
}

export class NetworkLogs extends Logger {
  constructor(fileNameAndLibrary: string) {
    super(true, 3, fileNameAndLibrary);
  }
}
