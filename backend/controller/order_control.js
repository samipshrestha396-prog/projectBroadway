import Order from "../model/order_schema.js";
import crypto from 'crypto'

const add_order = async (req, res) => {
  const {
    order_items,
    shipping_address,
    shipping_charge,
    item_price,
    tax_price,
    total_price,
    payment_method
  } = req.body;
 console.log("Payment method:",payment_method)
  const order = await Order.create({
    user: req.user._id,
    order_items,
    shipping_address,
    shipping_charge,
    item_price,
    tax_price,
    total_price,
    payment_method
  });
  res
    .status(201)
    .send({ message: "Order is taken successfully!", order_id: order._id });
  
};


const get_my_orders = async (req, res) => {
  const user = req.user._id;
  const order = await Order.find({ user });

  if (!order)
    return res.status(404).send({ error: " you have not taken orders" });
  res.json({ message: " your order are...", orders: order });
};

const get_my_orders_by_id = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate(
    "user",
    "name surename gmail",
  );
  if (!order) return res.status(404).send({ error: "product not found" });

  res.status(200).send({ message: "orders are", order });
};

const see_orders = async (req, res) => {
  const order = await Order.find().populate("user","name surename")
  if (!order)
    return res.status(404).send({ error: " there is no order today!" });
  res.status(200).send({ message: "Today's total order are...", orders: order });
};

const pay_order = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: " product not found" });
  order.is_paid = true;
  order.paid_at = new Date();
  await order.save();
  res.status(200).send({ message: "paid successfully!" });
};

const delivered = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: " orders not found" });
  order.is_delivered = true;
  order.delivered_at = new Date();

  await order.save();
  res.status(200).send({ message: "delivered successfully" });
};

const getPaymentDetails = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (!order) return res.status(404).send({ error: " orders not found" });
  const amount = Number(order.item_price).toFixed(2);
  const tax_amount = Number(order.tax_price).toFixed(2);
  const delivery_charge = Number(order.shipping_charge).toFixed(2);
  const service_charge = Number(0).toFixed(2);

  const total_amount = (
    Number(amount) +
    Number(tax_amount) +
    Number(delivery_charge) +
    Number(service_charge)
  ).toFixed(2);
  const transaction_uuid = `${Date.now()}-${order._id}`;
  const details = {
    amount: amount,
    tax_amount: tax_amount,
    total_amount: total_amount,
    transaction_uuid: transaction_uuid,
    product_code: "EPAYTEST",
    product_service_charge: service_charge,
    product_delivery_charge: delivery_charge,
    success_url: "http://localhost:9000/api/orders/confirm-payment",
    failure_url: "http://localhost:5173/orders/" + order._id,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: crypto
      .createHmac("sha256", "8gBm/:&EnhH.1/q")
      .update(
        `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`,
      )
      .digest("base64"),
  };
 
  res.send({ details });
};

const confirmPayment = async (req, res) => {
  const { data } = req.query;
  const { status, transaction_uuid } = await JSON.parse(
    Buffer.from(data, "base64").toString("utf-8"),
  );
  const orderId = transaction_uuid.split("-")[1];
  const order = await Order.findById(orderId);
  order.is_paid = true;
  order.paid_at = new Date();
   await order.save();
  return res.redirect("http://localhost:5173/order/" + orderId);
};

export {
  getPaymentDetails,
  add_order,
  get_my_orders,
  see_orders,
  pay_order,
  delivered,
  get_my_orders_by_id,
  confirmPayment,
};
