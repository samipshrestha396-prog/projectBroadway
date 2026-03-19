export const cartUpdate = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  state.itemPrice = Number(itemsPrice.toFixed(2));

  state.shipping_charge = state.itemPrice >= 100 ? 20 : 0;

  state.tax_price = Number((0.13 * state.itemPrice).toFixed(2));

  state.total_price = Number(
    (state.itemPrice + state.shipping_charge + state.tax_price).toFixed(2),
  );

  localStorage.setItem("cart", JSON.stringify(state));
};
