import mongoose from "mongoose";
const review_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
});

const product_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      requird: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    num_reviews: {
      type: Number,
      default: 0,
    },
    count_in_stock: {
      type: Number,
      default: 1,
    },
    reviews:[review_schema]
  },
  { timestamps: true },
);
const Product = mongoose.model("Products", product_schema);
export default Product;
