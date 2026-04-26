import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

import {
  mrDashboard,
  adminDashboard
} from "../controllers/dashboard.controller.js";

const router = express.Router();

/* ==============================
   MR Dashboard
============================== */
router.get(
  "/mr",
  protect,
  checkPermission(PERMISSIONS.CREATE_DCR),
  mrDashboard
);

/* ==============================
   Admin Dashboard
============================== */
router.get(
  "/admin",
  protect,
  checkPermission(PERMISSIONS.APPROVE_DCR),
  adminDashboard
);

export default router;
