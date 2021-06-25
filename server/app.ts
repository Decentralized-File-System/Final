import express from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
const app = express();

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

export default app;
