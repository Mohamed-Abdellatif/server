import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

import userRoute from "./routes/userRoute";
import announcementRoute from "./routes/announcementRoute";
import quizRoute from "./routes/quizRoute"


dotenv.config();


const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URL!)
  .then(() => console.log("Mongo Connected"));

app.use('/user',userRoute)
app.use('/announcement',announcementRoute);
app.use('/quiz',quizRoute);

app.listen(port, () => {
  console.log("server is running at 3001");
});
