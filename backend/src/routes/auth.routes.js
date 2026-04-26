import express from "express";

import {
registerUser,
loginUser,
logoutUser
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


/* ================= PUBLIC ADMIN REGISTER ================= */
/* First Company Admin Register */

router.post(
"/register",
registerUser
);


/* ================= ADMIN CREATE USERS ================= */
/* Admin creates MR / Doctor */

router.post(
"/create-user",
protect,
authorizeRoles("admin"),
registerUser
);


/* ================= LOGIN ================= */

router.post(
"/login",
loginUser
);


/* ================= LOGOUT ================= */

router.post(
"/logout",
protect,
logoutUser
);


export default router;