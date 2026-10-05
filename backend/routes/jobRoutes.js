import express from "express";
import {
  getJobs,
  getJob,
  createJob,
  extractJob,
  addJobFromLink,
  updateJob,
  deleteJob,
  getStats,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/stats", getStats);
router.get("/:id", getJob);
router.post("/", createJob);
router.post("/extract", extractJob);
router.post("/from-link", addJobFromLink);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;