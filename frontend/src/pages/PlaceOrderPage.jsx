import {
  Row,
  Col,
  Button,
  ListGroup,
  Badge,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router";

function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  return (
    <>
      <Container className="fluid">
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping:</h2>
                <p>
                  <strong>Address:</strong>
                  {shippingAddress.address},{shippingAddress.city},
                  {shippingAddress.postalcode},{shippingAddress.country},
                  {shippingAddress.phone}
                </p>
              </ListGroup.Item>
              <ListGroup.Item variant="flush">
                <h2>Payment Method:</h2>

                <p>
                  <strong>Method:</strong>
                  {cart.paymentMethod == "cod" ? (
                    <Badge>Cash on Delivery</Badge>
                  ) : (
                    <Badge bg="success">E-sewa</Badge>
                  )}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Items</h2>
                <ListGroup>
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} x{item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-dark text-white">
                  <h2>Order Summary:</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${cart.itemPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shipping_charge}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${cart.tax_price.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Grand Total:</Col>
                    <Col>${cart.total_price.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Button variant="warning">Check Orders</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default PlaceOrderPage;
