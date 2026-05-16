import mongoose from "mongoose";

const InsightSchema = new mongoose.Schema({}, { strict: false });
// strict: false → accepts all fields from JSON without defining each one

export default mongoose.model("Insight", InsightSchema);
