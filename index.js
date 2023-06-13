import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventRoute from "./routes/event.js";
import infoRoute from "./routes/info.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import applyRoute from "./routes/apply.js";
import joinRoute from "./routes/join.js";
import motivasiRoute from "./routes/motivasi.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("berkas"));
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/info", infoRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/apply", applyRoute);
app.use("/api/v1/join", joinRoute);
app.use("/api/v1/motivasi", motivasiRoute);
app.use("/", (req, res) => {
  res.send("Welcome to the server home page");
});

app.listen(port, () => {
  connect();
  console.log("Server listening on port", port);
});
