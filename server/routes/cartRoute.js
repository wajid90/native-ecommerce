import express from "express";
import {
  createCart,
  decrementCart,
  deleteCartItem,
  getUserCart,
} from "../controllers/cartController";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", authGuard, getUserCart);
router.post("/", authGuard, createCart);
router.delete("/:cartItemId", authGuard, deleteCartItem);
router.put("/quantity", authGuard, decrementCart);

export default router;
