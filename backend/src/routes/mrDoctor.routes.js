import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

import {
  assignDoctorToMR,
  getMRDoctors
} from "../controllers/mrDoctor.controller.js";

const router = express.Router();

/* Assign Doctor to MR */
router.post(
  "/assign",
  protect,
  checkPermission(PERMISSIONS.ASSIGN_DOCTOR),
  assignDoctorToMR
);

/* Get Doctors of MR */
router.get(
  "/:mrId",
  protect,
  getMRDoctors
);

export default router;
