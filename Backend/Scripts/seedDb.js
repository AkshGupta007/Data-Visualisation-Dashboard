import mongoose from "mongoose";
import Insight from "../Models/Insights.js";
import data from "../jsondata.json" with { type: "json" };
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected...");

    await Insight.deleteMany();
    await Insight.insertMany(data);
    console.log(`✅ ${data.length} records inserted!`);

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seed();
