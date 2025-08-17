import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_URLS, publicAxiosInstance } from "../../Services/Urls/Urls";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicAxiosInstance.post(
        AUTH_URLS.signup,
        userData
      );
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Registration error:", error);
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await publicAxiosInstance.post(AUTH_URLS.login, credentials);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const sendResetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await publicAxiosInstance.post(
        AUTH_URLS.forgetPassword,
        data
      );
      return res.data?.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await publicAxiosInstance.post(AUTH_URLS.resetPassword, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("accessToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedAccessToken || null,
    loading: false,
    error: null,
    resetEmail: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.data.user;
        state.token = action.payload.data.data.access_token;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.data.data.user)
        );
        localStorage.setItem(
          "accessToken",
          action.payload.data.data.access_token
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(sendResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.resetEmail = action.payload?.email;
      })
      .addCase(sendResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send reset email";
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "Password reset success";

        state.resetEmail = null; 
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password reset failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
