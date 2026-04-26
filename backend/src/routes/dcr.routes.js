import express from "express";

import {
  createDCR,
  addVisitToDCR,
  submitDCR,
  reviewDCR,
  exportDCRPdf,
  getAllDCR
} from "../controllers/dcr.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

const router = express.Router();

/* ================= GET ALL DCR ================= */

router.get(
  "/",
  protect,
  checkPermission(PERMISSIONS.VIEW_DCR),
  getAllDCR
);

/* ================= CREATE DCR ================= */

router.post(
  "/",
  protect,
  checkPermission(PERMISSIONS.CREATE_DCR),
  createDCR
);

/* ================= ADD VISIT ================= */

router.post(
  "/add-visit",
  protect,
  checkPermission(PERMISSIONS.CREATE_VISIT),
  addVisitToDCR
);

/* ================= SUBMIT DCR ================= */

router.post(
  "/submit/:id",   // ✅ FIXED
  protect,
  checkPermission(PERMISSIONS.SUBMIT_DCR),
  submitDCR
);

/* ================= REVIEW ================= */

router.post(
  "/review/:id",   // ✅ FIXED
  protect,
  checkPermission(PERMISSIONS.APPROVE_DCR),
  reviewDCR
);

/* ================= EXPORT PDF ================= */

router.get(
  "/export/:id",
  protect,
  checkPermission(PERMISSIONS.VIEW_DCR),
  exportDCRPdf
);

export default router;