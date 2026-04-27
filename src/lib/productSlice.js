import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./axiosClient";

export const saveProduct = createAsyncThunk("saveProduct", async (product) => {
  try {
    // console.log(import.meta.env.VITE_BASE_URL + "/alkol/save");
    //console.log(product);
    const response = await client.post("/alkol/save", product);
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error saving product:", error);
  }
});
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  try {
    const response = await client.get("/alkol/list");
    //console.log(response);
    return response.data;
  } catch (err) {
    //console.error("err:", err);
    return err;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {
      adi: "",
      alkolOrani: "",
      fiyat: 0.0,
      imagesUrl: "",
      alkolBoyutu: "",
      description: "",
      yearDate: "",
    },
    products: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
    productsSearch: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    searchProduct: (state, action) => {
      console.log(action);
      state.productsSearch = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.products = [...action.payload];
      localStorage.setItem("products", JSON.stringify(state.products));
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { searchProduct } = productSlice.actions;

export default productSlice.reducer;
