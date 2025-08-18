import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/Authentication/authSlice.js";
import productsReducer from "../modules/Admin/AdminProducts/productSlice.js";
import categoriesReducer from "../modules/Admin/AdminCategories/categorySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});
