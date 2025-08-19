import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CATEGORIES_URLS,
  publicAxiosInstance,
  privateAxiosInstance,
} from "../../../Services/Urls/Urls";

// جلب كل الأصناف
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicAxiosInstance.get(
        `${CATEGORIES_URLS.categories}`
      );
      console.log("Fetched categories:", res.data);
      return res.data || res.data; // حسب الباك
    } catch (err) {
      console.error("Error fetching categories:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// إضافة صنف جديد
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // أضف باقي الحقول
      formData.append("name_en", categoryData.name_en);
      formData.append("name_ar", categoryData.name_ar);

      // أضف الصورة (لو موجودة)
      if (categoryData.icon && categoryData.icon[0]) {
        formData.append("icon", categoryData.icon[0]);
      }

      const res = await privateAxiosInstance.post(
        `${CATEGORIES_URLS.create}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Created category:", res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error("Error adding category:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// تعديل صنف
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await privateAxiosInstance.put(
        `${CATEGORIES_URLS.update}/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// حذف صنف
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await privateAxiosInstance.delete(`${CATEGORIES_URLS.delete(id)}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.success = "تمت إضافة الصنف بنجاح";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const idx = state.items.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
        state.success = "تم تحديث الصنف بنجاح";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c._id !== action.payload);
        state.success = "تم حذف الصنف";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = categorySlice.actions;
export default categorySlice.reducer;
