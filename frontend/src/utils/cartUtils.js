export const cartUpdate = (state) => {
  state.itemPrice = (state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0)
  );
  
  
  state.shipping_charge = (state.itemPrice >= 100 ? 5 : 20);
  state.tax_price = (0.13 * state.itemPrice)
  state.total_price =state.itemPrice + state.shipping_charge + state.tax_price
  localStorage.setItem("cart", JSON.stringify(state));
};
