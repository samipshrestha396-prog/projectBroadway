import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((x) => x._id == item._id);
      if (exists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id == exists._id ? item : x,
        );
      } else {
        state.cartItems.push({ ...item });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;


