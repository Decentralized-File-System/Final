import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { NetworkLogs } from "./classes/Logger";
const app = express();

export const httpLogs = new NetworkLogs("logs/httpLogs.log");

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// @ts-ignore
app.use(httpLogs.connectLogger());

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use("/api", routes);
app.use(unknownEndpoint);

export default app;
