import express from "express";
import cors from "cors";
import fileRoute from "./routes/fileRoute";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/file", fileRoute);

export default app;
