import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Row, Col, Image, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router";
import Rating from "../components/Rating";
import { Badge, Button } from "react-bootstrap";
import { useGetProductsByIdQuery } from "../slices/productApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage() {
  // const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  // useEffect(() => {
  //   axios
  //     .get("/api/products/" + id)
  //     .then((resp) => setProduct(resp.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const { data: product, isLoading, error } = useGetProductsByIdQuery(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function addToCartHandler() {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  }
  return (
    <>
      <Link to="/" className="btn btn-light mx-3 btn-sm my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.message || error?.error}</Message>
      ) : (
        <Row className="my-2 mx-3">
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid varient="top" />
          </Col>
          <Col md={3}>
            <ListGroup varient="flush">
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item className="text-warning fs-3">
                {" "}
                $<strong>{product.price}</strong>
                <p className="brand-category ">
                  {product.brand},{product.category}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating value={product.rating} text={product.num_reviews} />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price:</strong>
                  </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                  </Col>
                  <Col>
                    {product.count_in_stock ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Out Of Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.count_in_stock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.count_in_stock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn btn-success text-white"
                  disabled={!product.count_in_stock}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
}
export default ProductPage;
