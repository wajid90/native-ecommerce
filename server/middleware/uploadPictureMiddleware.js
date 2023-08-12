import multer from "multer";
import path from "path";
import ErrorHandler from "../utils/errorHandler";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../assets/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(
        new ErrorHandler("Only .png .jpg .jpeg images are allowed", 404)
      );
    }
    cb(null, true);
  },
});

export { uploadPicture };
