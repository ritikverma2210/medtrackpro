import express from "express"

import {
createTerritory,
getTerritories,
deleteTerritory
} from "../controllers/territory.controller.js"

import { protect } from "../middleware/auth.middleware.js"
import { checkPermission } from "../middleware/permission.middleware.js"
import { PERMISSIONS } from "../config/roles.js"

const router = express.Router()


/* ================= CREATE TERRITORY ================= */

router.post(
"/",
protect,
checkPermission(PERMISSIONS.CREATE_TERRITORY),
createTerritory
)


/* ================= GET TERRITORIES ================= */

router.get(
"/",
protect,
checkPermission(PERMISSIONS.VIEW_TERRITORY),
getTerritories
)


/* ================= DELETE TERRITORY ================= */

router.delete(
"/:id",
protect,
checkPermission(PERMISSIONS.DELETE_TERRITORY),
deleteTerritory
)


export default router