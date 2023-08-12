import path from "path";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import { fileRemover } from "../utils/fileRemover";
import { Cart } from "../models/CartSchema";
const cloudinary = require("cloudinary");

const createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("hii there this wajid ....");
  const { title, supplier, description, product_location, price } = req.body;

  if (!title || !supplier || !description || !product_location || !price) {
    fileRemover(req.file.filename);
    return next(new ErrorHandler("All feild are Required ...", 404));
  }

  // console.log(req.file);
  if (req.file === null) {
    fileRemover(req.file.filename);
    return next(new ErrorHandler("product Image Is Required ....", 401));
  }

  try {
    let product = await Product.findOne({ title });

    if (product) {
      fileRemover(req.file.filename);
      return next(new ErrorHandler("product Already Exists ....", 401));
    }

    var imageFile = req.file;

    console.log(imageFile);
    let productdData;
    await cloudinary.uploader.upload(imageFile.path, async function (result) {
      fileRemover(req.file.filename);
      if (result.url) {
        productdData = await Product.create({
          title,
          supplier,
          price,
          description,
          product_location,
          imageUrl: result.url,
        });

        await productdData.save();

        res.status(201).json({
          _id: productdData._id,
          imageUrl: productdData.imageUrl,
          title: productdData.title,
          supplier: productdData.supplier,
          description: productdData.description,
          product_location: productdData.product_location,
        });
      } else {
        console.log("Error uploading to cloudinary");
      }
    });
  } catch (e) {
    fileRemover(req.file.filename);
    return next(new ErrorHandler(e.message, 401));
  }
});

const getAllProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (e) {
    return next(new ErrorHandler("Faild to get the product ....", 500));
  }
});

const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.find(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Doesn't Exists ....", 500));
    }

    res.status(200).json(product);
  } catch (e) {
    return next(new ErrorHandler("Faild to get the product ....", 500));
  }
});

const searchProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.params.key);
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "furniture",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (e) {
    return next(new ErrorHandler("Failed to get the product ....", 500));
  }
});

// --------------------------------------------------------------------

export { createProduct, getAllProduct, getSingleProduct, searchProduct };
