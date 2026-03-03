import Order from "../model/order_schema.js";

const add_order = async (req, res) => {
  const {
    order_items,
    shipping_address,
    shipping_charge,
    item_price,
    tax_price,
    total_price,
  } = req.body;
  const order = await Order.create({
    user: req.user._id,
    order_items,
    shipping_address,
    shipping_charge,
    item_price,
    tax_price,
    total_price,
  });
  res.status(201).send({ message: "Order is taken successfully!" ,order_id:order._id,});
};




const get_my_orders = async( req , res)=>{
  const user = req.user._id
  const orders = await Order.find({user});
  if(!orders) return res.status(404).send({error:" you have not taken orders"});
  res.send({message:" your order are...",items: orders})

};

const get_my_orders_by_id = async ( req , res)=>{
  const id = req.params.id;
  const orders = await Order.findById(id);
  if(!orders) return res.status(404).send({error:"product not found"});

  res.status(200).send({message:"orders are",orders})
}

const see_orders = async ( req ,res)=>{
  const orders =  await Order.find()
  if(!orders) return res.status(404).send({error:" there is no order today!"});
  res.status(200).send({message:"Today's total order are...",items: orders})

};


const pay_order = async ( req, res)=>{
  const id = req.params.id;
  const orders = await Order.findById(id);
  if(!orders) return res.status(404).send({error:" product not found"});
  orders.is_paid = true;
  orders.paid_at= new Date();
  await orders.save();
  res.status(200).send({message:"paid successfully!"});

  
};

const delivered = async (req , res)=>{
  const id = req.params.id;

  const orders = await Order.findById(id);
  if (!orders) return res.status(404).send({error:" orders not found"});
  orders.is_delivered = true;
  orders.delivered_at = new Date();
  
  await orders.save();
  res.status(200).send({message:"delivered successfully"});

};
 

export { add_order,get_my_orders,see_orders,pay_order,delivered,get_my_orders_by_id};











