import express from "express"

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js"

import { protect } from "../middleware/auth.middleware.js"
import { checkPermission } from "../middleware/permission.middleware.js"
import { PERMISSIONS } from "../config/roles.js"

const router = express.Router()


/* ================= CREATE PRODUCT ================= */
/* Admin Only */

router.post(
  "/",
  protect,
  checkPermission(PERMISSIONS.CREATE_PRODUCT),
  createProduct
)


/* ================= GET PRODUCTS ================= */
/* Admin + MR + Doctor */

router.get(
  "/",
  protect,
  checkPermission(PERMISSIONS.VIEW_PRODUCT),
  getProducts
)


/* ================= UPDATE PRODUCT ================= */

router.put(
  "/:id",
  protect,
  checkPermission(PERMISSIONS.UPDATE_PRODUCT),
  updateProduct
)


/* ================= DELETE PRODUCT ================= */

router.delete(
  "/:id",
  protect,
  checkPermission(PERMISSIONS.DELETE_PRODUCT),
  deleteProduct
)

export default router