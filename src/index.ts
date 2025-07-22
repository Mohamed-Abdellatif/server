import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import userRoute from "./routes/userRoute";
import announcementRoute from "./routes/announcementRoute";
import quizRoute from "./routes/quizRoute";


dotenv.config();

const app = express();
app.use(cors());
const port = 3001;

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.Allowed_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
});

app.use(express.json());



mongoose
  .connect(process.env.MONGO_DB_URL!)
  .then(() => console.log("Mongo Connected"));


app.use("/user", userRoute);
app.use("/announcement", announcementRoute);
app.use("/quiz", quizRoute);

httpServer.listen(port, () => {
  console.log("server is running at 3001");
});

export { io };
