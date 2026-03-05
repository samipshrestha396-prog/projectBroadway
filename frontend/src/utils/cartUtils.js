export const cartUpdate = (state) => {
  state.itemPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  localStorage.setItem("cart", JSON.stringify(state));
};
