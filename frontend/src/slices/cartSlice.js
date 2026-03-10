import { createSlice } from "@reduxjs/toolkit";
import { cartUpdate } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "cod",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((x) => x._id === item._id);

      if (exists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === exists._id ? item : x,
        );
      } else {
        state.cartItems.push({ ...item ,product:item._id});
      }

      cartUpdate(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      cartUpdate(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      cartUpdate(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      cartUpdate(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      cartUpdate(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
