import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dataRoutes from "./Routes/dataRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", dataRoutes);

const Port=process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(Port, () =>
      console.log(`Server running on ${Port}`),
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
