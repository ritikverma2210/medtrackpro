import express from "express"
import { protect } from "../middleware/auth.middleware.js"

import {
getNotifications,
markAsRead
} from "../controllers/notification.controller.js"

const router = express.Router()

/* Get Notifications */

router.get(
"/",
protect,
getNotifications
)

/* Mark Read */

router.put(
"/:id",
protect,
markAsRead
)

export default router