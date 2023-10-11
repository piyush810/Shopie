import express from "express";
import { deleteOrderController } from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

router.delete(
  "/delete-order/:id",requireSignIn,
  deleteOrderController
);

export default router;