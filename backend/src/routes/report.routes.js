import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMonthlyPerformance,
    getYearlyVisitTrend,
     getYearlyDCRTrend,
      getMRPerformance,
      exportMonthlyExcel
} from "../controllers/report.controller.js";

const router = express.Router();

/* ================= MONTHLY PERFORMANCE ================= */
router.get(
  "/monthly-performance",
  protect,
  getMonthlyPerformance
);
router.get(
  "/visit-trend",
  protect,
  getYearlyVisitTrend
);
router.get(
    "/dcr-trend",
    protect,
    getYearlyDCRTrend
);
router.get(
    "/mr-performance",
    protect,
    getMRPerformance
);
router.get(
  "/export-excel",
  protect,
  exportMonthlyExcel
);
export default router;
