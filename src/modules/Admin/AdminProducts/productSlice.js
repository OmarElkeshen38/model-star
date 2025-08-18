import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRODUCTS_URLS,
  publicAxiosInstance,
  privateAxiosInstance,
} from "../../../Services/Urls/Urls";

// 1- get all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicAxiosInstance.get(`${PRODUCTS_URLS.products}`);

      console.log("Fetched products:", res.data.data.data);

      return res.data.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2- add product
export const addProduct = createAsyncThunk(
  "products/add",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key === "image" && Array.isArray(productData.image)) {
          productData.image.forEach((file) => {
            if (file instanceof File) {
              formData.append("image", file); // ✅ نفس المفتاح يتكرر
            }
          });
        } else {
          formData.append(key, productData[key]);
        }
      });

      const res = await privateAxiosInstance.post(
        `${PRODUCTS_URLS.create}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Add product error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3- update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "category" || key === "images" || key === "image") return;

        formData.append(key, data[key]);
      });

      const res = await privateAxiosInstance.post(
        `${PRODUCTS_URLS.update(id)}`,
        formData
      );

      console.log("Updated product:", res.data);

      return res.data.data.data;
    } catch (err) {
      console.error("Update error:", err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4- delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    console.log("Deleting product with ID:", id);

    try {
      const res = await privateAxiosInstance.delete(
        `${PRODUCTS_URLS.delete(id)}`
      );

      console.log("Deleted product:", res.data);

      return { id, ...res.data };
    } catch (err) {
      console.error("Delete error:", err.response?.data);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || action.payload;
        state.total = action.payload.total || action.payload.length;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.total += 1;
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const idx = state.items.findIndex((p) => p.id === updatedProduct.id);
        if (idx !== -1) {
          state.items[idx] = updatedProduct; // تحديث المنتج
        }

        state.success = "تم تحديث المنتج بنجاح";
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.total -= 1;

        const deletedId = action.payload.id;
        state.items = state.items.filter((p) => p.id !== deletedId);
      });
  },
});

export default productSlice.reducer;
