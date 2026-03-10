import mongoose from "mongoose";

const order_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order_items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shipping_address: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      postal_code: { type: Number, required: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
    },
    item_price: { type: Number, required: true },
    tax_price: { type: Number, required: true },
    shipping_charge: { type: Number, required: true },
    total_price: { type: Number, required: true },
    payment_method: { type: String, default: "cod" },
    is_paid: { type: Boolean, default: false },
    is_delivered: { type: Boolean, default: false },
    paid_at: { type: Date },
    delivered_at: { type: Date },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", order_schema);
export default Order;
