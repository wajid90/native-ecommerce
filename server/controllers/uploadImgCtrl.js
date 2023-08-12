const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {
  cloudinaryUploader,
  cloudinaryDeleteImages,
} = require("../utils/cloudinary");
const fs = require("fs");

const uploadImages = catchAsyncErrors(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploader(path, "images");

    const url = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);
      url.push(newPath);
      fs.unlinkSync(path);
    }
    const images = url.map((file) => {
      return file;
    });

    res.json(images);
  } catch (e) {
    throw new Error(e);
  }
});

const ClouldDeleteImages = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  // validateeMongoDbId(id);
  try {
    const deleteImg = cloudinaryDeleteImages(id, "images");

    res.json({ message: "Delete" });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  uploadImages,
  ClouldDeleteImages,
};
