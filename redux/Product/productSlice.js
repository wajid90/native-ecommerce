import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  searchproducts: [],
  isError: false,
  isSuccess: false,
  isLoadding: false,
  message: "",
};

export const getAllproducts = createAsyncThunk(
  "products/all-products",
  async (thunkAPI) => {
    try {
      return await productService.getAllProduct();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const searchProducts = createAsyncThunk(
  "products/search-products",
  async (key, thunkAPI) => {
    try {
      return await productService.searchProduct(key);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getSingleproduct = createAsyncThunk(
  "products/single-products",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const createProducts = createAsyncThunk(
  "products/crete-products",
  async (data, thunkAPI) => {
    try {
      return await productService.createProduct(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getAllProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllproducts.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getAllproducts.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllproducts.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = action.payload?.response?.data?.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.searchproducts = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.searchproducts = [];
        state.message = action.payload?.response?.data?.message;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.createProduct = action.payload;
        state.message = "Product Created Sucessfully ....";
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleproduct.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getSingleproduct.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.singleProduct = action.payload[0];
      })
      .addCase(getSingleproduct.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default getAllProductsSlice.reducer;
