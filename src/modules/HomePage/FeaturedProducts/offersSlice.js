import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OFFERS_PRODUCTS, publicAxiosInstance } from "../../../Services/Urls/Urls";

export const getOffersProducts = createAsyncThunk(
  "offers/getOffersProducts",
  async () => {
    const { data } = await publicAxiosInstance.get(OFFERS_PRODUCTS.offers);
    console.log(data.data.products);

    return data.data.products;
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOffersProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOffersProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getOffersProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default offersSlice.reducer;
