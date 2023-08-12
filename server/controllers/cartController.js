import catchAsyncErrors from "../middleware/catchAsyncErrors";
import Product from "../models/Product";
import ErrorHandler from "../utils/errorHandler";
import { fileRemover } from "../utils/fileRemover";
import { Cart } from "../models/CartSchema";

const createCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItem, quantity } = req.body;
  const { _id } = req.user;
  try {
    const cartData = await Cart.findOne({ userId: _id });
    if (cartData) {
      const existCartData = cartData.products.find(
        (product) => product.cartItem.toString() === cartItem
      );

      if (existCartData) {
        existCartData.quantity += 1;
      } else {
        cartData.products.push({ cartItem, quantity });
      }
      await cartData.save();

      return res.status(200).json("Product added to Cart");
    } else {
      const newCart = new Cart({
        userId: _id,
        products: [
          {
            cartItem,
            quantity,
          },
        ],
      });
      await newCart.save();

      return res.status(200).json("Product added to Cart");
    }
  } catch (e) {
    return next(new ErrorHandler("Something Went to Wrong ....", 500));
  }
});
const deleteCartItem = catchAsyncErrors(async (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  try {
    const updateCart = await Cart.findOneAndUpdate(
      { "products._id": cartItemId },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    );
    if (!updateCart) {
      return res.status(404).json("Cart Item not Found ...");
    }
    res.status(200).json(updateCart);
  } catch (error) {
    return next(new ErrorHandler("Something Went to Wrong ....", 500));
  }
});
const decrementCart = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  const { cartItem } = req.body;
  try {
    const cartData = await Cart.findOne({ userId: _id });

    if (!cartData) {
      return res.status(404).json({ message: "Cart Not Found ..." });
    }
    const existCartData = cartData.products.find(
      (product) => product._id.toString() === cartItem
    );
    console.log(existCartData);
    if (!existCartData) {
      return res.status(200).json("Cart Data Not Found ...");
    }
    if (existCartData.quantity == 1) {
      cartData.products = cartData.products.filter(
        (product) => product.cartItem !== cartItem
      );
    } else {
      existCartData.quantity -= 1;
    }

    await cartData.save();

    if (existCartData.quantity === 0) {
      await Cart.updateOne(
        { userId: _id },
        { $pull: { products: { cartItem } } }
      );
    }

    return res.status(200).json("Product Updated SuccessFully ....");
  } catch (e) {
    return next(new ErrorHandler("Something Went to Wrong ....", 500));
  }
});

// const updateCart = catchAsyncErrors(async (req, res) => {
//   const { _id } = req.user;
//   const { cartitemId, newQuantity } = req.body;

//   try {
//     const cartItem = await Cart.findOne({ userId: _id, _id: cartitemId });

//     cartItem.quantity = newQuantity;
//     cartItem.save();

//     res.json(cartItem);
//   } catch (e) {
//     throw new Error(e);
//   }
// });
const getUserCart = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ userId: _id }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    );

    return res.status(200).json(cart);
  } catch (e) {
    return next(new ErrorHandler("Something Went to Wrong ....", 500));
  }
});

const emptyCart = catchAsyncErrors(async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.deleteMany({ userId: _id });
    res.json(cart);
  } catch (e) {
    throw new Error(e);
  }
});

export { createCart, deleteCartItem, decrementCart, getUserCart, emptyCart };
