import express from "express";
import {
  getAllResponses,
  getResponsesByDepartment,
  getDepartmentsSummary,
} from "../controllers/studentController.js";
import {
  adminLogin,
  verifyAdminSession,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- Public Auth Routes ---
router.post("/login", adminLogin);

// --- Protected Admin Routes ---
router.get("/verify", authMiddleware, verifyAdminSession);
router.get("/departments", authMiddleware, getDepartmentsSummary);
router.get("/departments/:departments", authMiddleware, getResponsesByDepartment);
router.get("/", authMiddleware, getAllResponses);

export default router;
