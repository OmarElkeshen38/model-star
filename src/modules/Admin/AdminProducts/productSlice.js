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
        if (key === "images") {
          productData.images.forEach((img) => formData.append("images", img));
        } else {
          formData.append(key, productData[key]);
        }
      });

      const res = await privateAxiosInstance.post(
        `${PRODUCTS_URLS.create}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
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
        if (key === "images" && Array.isArray(data.images)) {
          data.images.forEach((img) => formData.append("images", img));
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await privateAxiosInstance.put(
        `${PRODUCTS_URLS.update(id)}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (err) {
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
        `${PRODUCTS_URLS.delete()}`, {
            params: { id } 
        }
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
        state.items = action.payload.products || action.payload; // حسب الريسبونس عندك
        state.total = action.payload.total || action.payload.length;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += 1;
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.total -= 1;
      });
  },
});

export default productSlice.reducer;
