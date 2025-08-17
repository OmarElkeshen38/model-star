import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/Authentication/authSlice.js";
import productsReducer from "../modules/Admin/AdminProducts/productSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
