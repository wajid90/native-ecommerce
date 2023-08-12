import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
