
import { useParams, Link } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import {
  Row,
  Form,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import Rating from "../components/Ratings";

function ProductPage() {
  // const [product, setProduct] = useState({});
   const [qty , setQty] = useState(1)

  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  // useEffect(() => {
    
  //   axios
  //     .get(`/api/products/${id}`)
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.log(err.message));
  // }, []);
 const addToCartHandler = () => {
  if (!product) return; // make sure product exists
  dispatch(addToCart({ ...product, qty }));
};

  return (
    <>
   
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush shadow-lg">
              <ListGroup.Item className="bg-dark text-white">
                {product.name}
              </ListGroup.Item>
              <ListGroup.Item>{product.category}</ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item>{product.brand}</ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.num_reviews} />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price</strong>
                    </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup variant="flush shadow-lg">
                  {" "}
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Status</strong>
                      </Col>
                      <Col>
                        {product.count_in_stock ? (
                          <Badge className="bg-primary-pill">In Stock</Badge>
                        ) : (
                          <Badge className="bg-danger">Out of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={e=> setQty(Number(e.target.value))}>
                          {[...Array(product.count_in_stock).keys()].map(
                            (x) => (
                              <option key={x + 1}>{x + 1}</option>
                            ),
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button variant="dark" disabled={!product.count_in_stock} onClick={addToCartHandler}>
                          Add to cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
export default ProductPage;
