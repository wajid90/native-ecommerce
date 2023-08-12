import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  searchProduct,
} from "../controllers/productController";
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadImages } from "../controllers/uploadImgCtrl";
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.get("/search/:key", searchProduct);
router.post("/create",authGuard,adminGuard, uploadPicture.single("imageUrl"), createProduct);

export default router;
