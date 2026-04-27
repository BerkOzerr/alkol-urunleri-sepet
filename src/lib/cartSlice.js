import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartList: localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList"))
    : [],
  totalQuantity: localStorage.getItem("totalQuantity")
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0,
  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
  cartSearch: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartList: (state, action) => {
      const itemIndex = state.cartList.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        if (state.cartList[itemIndex].quantity >= 10) {
          toast.error(
            `Sepetteki ürün sayisi ${state.cartList[itemIndex].quantity} geçemez.`,
            { position: "bottom-left" },
          );
          return;
        }
        toast.info(
          `Sepetteki ürün sayisi ${state.cartList[itemIndex].quantity}.`,
          {
            position: "bottom-left",
          },
        );

        state.cartList[itemIndex].quantity += 1;
      } else {
        const temp = { ...action.payload, quantity: 1 };
        toast.success(`Sepete ${temp.adi} eklediniz.`, {
          position: "bottom-left",
        });
        state.cartList.push(temp);
      }

      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    removeCartList: (state, action) => {
      const nextCartItem = state.cartList.filter(
        (cart) => cart.id !== action.payload.id,
      );
      state.cartList = nextCartItem;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));

      toast.error(`${action.payload.adi} removed from cart...`, {
        position: "bottom-left",
      });
    },
    decrementCartList: (state, action) => {
      const itemIndex = state.cartList.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (state.cartList[itemIndex].quantity > 1) {
        state.cartList[itemIndex].quantity -= 1;
        toast.info(
          `Sepetteki ürün sayisi ${state.cartList[itemIndex].quantity}.`,
          {
            position: "bottom-left",
          },
        );
      } else if (state.cartList[itemIndex].quantity === 1) {
        const nextCartItem = state.cartList.filter(
          (cart) => cart.id !== action.payload.id,
        );
        toast.error(`${action.payload.adi} removed from cart...`, {
          position: "bottom-left",
        });
        state.cartList = nextCartItem;
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    clearCartList: (state) => {
      state.cartList = [];
      toast.error("Cart Cleared", { position: "bottom-left" });
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    getTotal: (state) => {
      let { totalC, quantityC } = state.cartList.reduce(
        (cartTotal, cartItem) => {
          const { fiyat, quantity } = cartItem;
          const itemTotal = fiyat * quantity;
          cartTotal.totalC += itemTotal;
          cartTotal.quantityC += quantity;
          return cartTotal;
        },
        {
          totalC: 0,
          quantityC: 0,
        },
      );
      state.totalQuantity = quantityC;
      state.totalAmount = totalC;
    },
    searchCard: (state, action) => {
      console.log(action);
      state.cartSearch = [...action.payload];
    },
  },
});
export const {
  addCartList,
  removeCartList,
  decrementCartList,
  clearCartList,
  getTotal,
  searchCard,
} = cartSlice.actions;

export default cartSlice.reducer;
