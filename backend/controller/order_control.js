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
  const order = await Order.find({user});
  if(!order) return res.status(404).send({error:" you have not taken orders"});
  res.send({message:" your order are...",items: order})

};

const get_my_orders_by_id = async ( req , res)=>{
  const id = req.params.id;
  const order = await Order.findById(id).populate("user","name surename gmail");
  if(!order) return res.status(404).send({error:"product not found"});

  res.status(200).send({message:"orders are",order})
}

const see_orders = async ( req ,res)=>{
  const order =  await Order.find()
  if(!order) return res.status(404).send({error:" there is no order today!"});
  res.status(200).send({message:"Today's total order are...",items: order})

};


const pay_order = async ( req, res)=>{
  const id = req.params.id;
  const order = await Order.findById(id);
  if(!order) return res.status(404).send({error:" product not found"});
  order.is_paid = true;
  order.paid_at= new Date();
  await order.save();
  res.status(200).send({message:"paid successfully!"});

  
};

const delivered = async (req , res)=>{
  const id = req.params.id;

  const order = await Order.findById(id);
  if (!order) return res.status(404).send({error:" orders not found"});
  order.is_delivered = true;
  order.delivered_at = new Date();
  
  await order.save();
  res.status(200).send({message:"delivered successfully"});

};
 

export { add_order,get_my_orders,see_orders,pay_order,delivered,get_my_orders_by_id};











