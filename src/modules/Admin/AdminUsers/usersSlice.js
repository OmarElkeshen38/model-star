import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import privateAxiosInstance, { USERS_URLS } from "../../../Services/Urls/Urls";

// 🟢 Get Users
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.get(USERS_URLS.users);
      console.log(res.data.data);

      return res.data.data; // اتأكد من شكل الـ response
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل في تحميل المستخدمين"
      );
    }
  }
);

// 🟢 Create User
export const createUser = createAsyncThunk(
  "users/create",
  async (data, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.post(USERS_URLS.create, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل في إنشاء المستخدم"
      );
    }
  }
);

// 🟢 Update User
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.put(USERS_URLS.update(id), data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل في تعديل المستخدم"
      );
    }
  }
);

// update role
export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, thunkAPI) => {
    try {
      const res = await privateAxiosInstance.post(USERS_URLS.update_role(id), {
        role,
      });
      console.log("Role updated:", res.data.data);

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل في تعديل دور المستخدم"
      );
    }
  }
);

// 🟢 Delete User
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      await privateAxiosInstance.delete(USERS_URLS.delete(id));
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "فشل في حذف المستخدم"
      );
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // update
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.items.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      // delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u._id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
