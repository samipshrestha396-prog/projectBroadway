import Product from "../model/User.products.js";

const get_products = async (req, res) => {
  const products = await Product.find().populate("user", "name gmail -_id");
  res.send(products);
};
const get_product_by_id = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.send({ error: "product not found!" });
  }
  res.send(product);
};

const post_products = async (req, res) => {
  try {
    const products = {
      user: req.user._id,
      name: "sample name",
      price: 1,
      description: "Write something about product",
      brand: "sample brand",
      category: "sample categgory",
    };
    const new_added_product = await Product.create(products);
    res.send({
      message: "created successfully!",
      item: new_added_product,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const put_product = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, brand, category, image, count_in_stock } =
    req.body;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "product not found" });
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.image = image || product.image;
  product.count_in_stock = count_in_stock || product.count_in_stock;
  await product.save();
  res.status(201).send({ message: "updated successfully!" });
};

const delete_products = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    return res.status(404).send({ error: "product not found with that id" });
  res.status(200).send({ message: "product delete successfully" });
};

const add_review = async (req, res) => {
  const { title, comment, rating } = req.body;
  const id = req.params.id;
  const user = req.user._id;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "product not found!" });
  const already_reviewed = product.reviews.find(
    (r) => r.user.toString() == user,
  );
  if (already_reviewed)
    return res.status(400).send({ error: "already reviewed" });
  product.reviews.push({
    title,
    comment,
    rating,
    user,
  });

  product.num_reviews += 1;

  const total_rating = product.reviews.reduce((acc, r) => acc + r.rating, 0);

  product.rating = (total_rating / product.num_reviews).toFixed(2);
  await product.save();

  res.status(201).send({ message: "review created" });
};

export {
  get_products,
  post_products,
  get_product_by_id,
  add_review,
  put_product,
  delete_products,
};
