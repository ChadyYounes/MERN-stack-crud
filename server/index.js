import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Db Connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is runningsssss on port :${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", route);
