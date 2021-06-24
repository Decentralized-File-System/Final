import express from "express";
import cors from "cors";
import routes from "./routes";
import { checkUser } from "./middlewares/authMiddleware";
import cookieParser from "cookie-parser"
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", checkUser, routes);

export default app;
