const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const cloudinaryUploader = async (filetoUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(filetoUpload, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        { resource_type: "auto" }
      );
    });
  });
};

const cloudinaryDeleteImages = async (filetoUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(filetoUpload, (result) => {
      resolve(  
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        { resource_type: "auto" }
      );
    });
  });
};

module.exports = { cloudinaryUploader, cloudinaryDeleteImages };
