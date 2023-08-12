import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/Auth/AuthSlice";
import productsReducer from "./redux/Product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
