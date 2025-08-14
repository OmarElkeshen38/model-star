import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/Authentication/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
