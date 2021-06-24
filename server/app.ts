import express from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

export default app;
