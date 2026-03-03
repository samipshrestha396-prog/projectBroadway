import connectDb from "./db/connectDB.js";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./model/User.js";
import Product from "./model/User.products.js";
import Order from "./model/order_schema.js";

async function loadData() {
  await connectDb();
  await Product.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();
  const newUsers = await User.insertMany(users);
  const adminId = newUsers[0]._id;
  const newProducts = products.map((pdt) => {
    return { user: adminId, ...pdt };
  });
  await Product.insertMany(newProducts);
  console.log("data loaded success!");
  process.exit();
}

async function destroyData() {
  await connectDb();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();
  console.log("data cleared success!");
  process.exit();
}

const node = process.argv[2] || "";
if ((node == "-D")) {
  destroyData();
} else {
  loadData();
}
