import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

// Database
const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    autoIndex: false,
  },
  (err) => {
    if (err) throw err;
    console.log("DB connected!");
  }
);

// Routes
app.use("/api", routes);
//Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
