import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const app = express();

//Settings
app.set("port", process.env.PORT);

//Middlewares
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

//Routes
app.use("/api/v1", userRoutes);

export default app;
