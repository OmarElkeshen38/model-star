import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/Authentication/authSlice.js";
import productsReducer from "../modules/Admin/AdminProducts/productSlice.js";
import categoriesReducer from "../modules/Admin/AdminCategories/categorySlice.js";
import usersReducer from "../modules/Admin/AdminUsers/usersSlice.js";
import offersReducer from '../modules/HomePage/FeaturedProducts/offersSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    offers: offersReducer,
  },
});
