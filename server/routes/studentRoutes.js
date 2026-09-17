import express from "express";
import {
  getAllResponses,
  getResponsesByDepartment,
  getDepartmentsSummary,
} from "../controllers/studentController.js";

const router = express.Router();

// GET /departments - Fetch list of all departments with counts
router.get("/departments", getDepartmentsSummary);

// GET /departments/:departments - Fetch responses for a specific department
router.get("/departments/:departments", getResponsesByDepartment);

// GET / - Fetch all student responses (supports ?department=, ?role=, ?search=)
router.get("/", getAllResponses);

export default router;


