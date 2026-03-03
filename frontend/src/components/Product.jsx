import { Card } from "react-bootstrap";
import Rating from "./Ratings";
import { Link } from "react-router";

function Product({ product }) {
  return (
    <Card className=" my-3 p-3 rounded  " style={{ width: "18rem" }}>
      <Link to={`product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div" className="product-title">
          <Link to={`product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.num_reviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
