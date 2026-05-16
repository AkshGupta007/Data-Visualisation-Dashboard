import express from "express";
import { getData, getFilters } from "../controllers/dataController.js";

const router = express.Router();

router.get("/data", getData);
router.get("/filters", getFilters);

export default router;
