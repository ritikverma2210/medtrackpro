import express from "express"

import { protect } from "../middleware/auth.middleware.js"
import { checkPermission } from "../middleware/permission.middleware.js"
import { PERMISSIONS } from "../config/roles.js"

import {
  createVisit,
  getMRVisits
} from "../controllers/visit.controller.js"

const router = express.Router()

/* ================= CREATE VISIT ================= */

router.post(
  "/",
  protect,
  checkPermission(PERMISSIONS.CREATE_VISIT),
  createVisit
)

/* ================= GET MR VISITS ================= */

router.get(
  "/:mrId",
  protect,
  checkPermission(PERMISSIONS.VIEW_VISIT),
  getMRVisits
)

export default router