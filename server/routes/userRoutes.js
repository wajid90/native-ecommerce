import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  handleRefreshToken,
  deleteUser,
} from "../controllers/userController";
import { authGuard } from "../middleware/authMiddleware";
import { uploadPicture } from "../middleware/uploadPictureMiddleware";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/profile", authGuard, userProfile);
router.delete("/user-delete", authGuard, deleteUser);

router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);

export default router;
