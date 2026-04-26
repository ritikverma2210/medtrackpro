import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { checkPermission } from "../middleware/permission.middleware.js";
import { PERMISSIONS } from "../config/roles.js";

import {
createMR,
assignTerritoryToMR,
assignDoctorToMR,
getAllMR,
getMRProfile,
getMyDoctors
} from "../controllers/mr.controller.js";

const router = express.Router();

/* ================= MR PROFILE ================= */

router.get(
"/profile",
protect,
getMRProfile
)

/* ================= MY DOCTORS ================= */

router.get(
"/my-doctors",
protect,
getMyDoctors
)

/* ================= CREATE MR ================= */

router.post(
"/",
protect,
checkPermission(PERMISSIONS.CREATE_MR),
createMR
);

/* ================= ASSIGN TERRITORY ================= */

router.post(
"/assign-territory",
protect,
checkPermission(PERMISSIONS.ASSIGN_TERRITORY),
assignTerritoryToMR
);

/* ================= ASSIGN DOCTOR ================= */

router.post(
"/assign-doctor",
protect,
checkPermission(PERMISSIONS.ASSIGN_DOCTOR),
assignDoctorToMR
);

/* ================= GET ALL MR ================= */

router.get(
"/",
protect,
checkPermission(PERMISSIONS.CREATE_MR),
getAllMR
);

/* ================= GET MR BY ID (ALWAYS LAST) ================= */

router.get(
"/:id",
protect,
checkPermission(PERMISSIONS.CREATE_MR),
getAllMR
);

export default router;