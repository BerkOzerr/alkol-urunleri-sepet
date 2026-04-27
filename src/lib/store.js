import { configureStore } from "@reduxjs/toolkit";
import themaSlice from "./themaSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    thema: themaSlice,
    product: productSlice,
    user: userSlice,
    cart: cartSlice,
  },
});
