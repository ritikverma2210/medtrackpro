import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

import {
doctorDashboard,
getDoctorProfile,
getDoctorVisits,
createDoctor,
getDoctors,
getDoctorById,
updateDoctor,
deleteDoctor
} from "../controllers/doctor.controller.js";

const router = express.Router();

/* ================= DASHBOARD ================= */

router.get(
"/dashboard",
protect,
doctorDashboard
)

/* ================= DOCTOR VISITS ================= */

router.get(
"/visits",
protect,
getDoctorVisits
)

/* ================= DOCTOR PROFILE ================= */

router.get(
"/profile",
protect,
getDoctorProfile
)

/* ================= CREATE ================= */

router.post(
"/",
protect,
checkPermission(PERMISSIONS.CREATE_DOCTOR),
createDoctor
)

/* ================= READ ALL ================= */

router.get(
"/",
protect,
checkPermission(PERMISSIONS.VIEW_DOCTOR),
getDoctors
)

/* ================= UPDATE ================= */

router.put(
"/:id",
protect,
checkPermission(PERMISSIONS.CREATE_DOCTOR),
updateDoctor
)

/* ================= DELETE ================= */

router.delete(
"/:id",
protect,
checkPermission(PERMISSIONS.DELETE_DOCTOR),
deleteDoctor
)

/* ================= READ ONE (ALWAYS LAST) ================= */

router.get(
"/:id",
protect,
checkPermission(PERMISSIONS.VIEW_DOCTOR),
getDoctorById
)

export default router;