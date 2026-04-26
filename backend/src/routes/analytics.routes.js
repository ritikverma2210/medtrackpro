import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

import {
  monthlyVisitStats,
  mrPerformanceStats,
  dcrStatusStats,
  territoryPerformance
} from "../controllers/analytics.controller.js";

const router = express.Router();

/* Monthly Visit Chart */
router.get(
  "/visits-monthly",
  protect,
  checkPermission(PERMISSIONS.VIEW_REPORT),
  monthlyVisitStats
);

/* MR Performance Chart */
router.get(
  "/mr-performance",
  protect,
  checkPermission(PERMISSIONS.VIEW_REPORT),
  mrPerformanceStats
);

/* DCR Status Pie Chart */
router.get(
  "/dcr-status",
  protect,
  checkPermission(PERMISSIONS.VIEW_REPORT),
  dcrStatusStats
);

/* Territory Performance */
router.get(
  "/territory-performance",
  protect,
  checkPermission(PERMISSIONS.VIEW_REPORT),
  territoryPerformance
);

export default router;
