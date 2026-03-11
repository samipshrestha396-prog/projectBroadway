


import { Link, useParams } from "react-router";
import {
  Row,
  Col,
  ListGroup,
  Container,
  Badge,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader"; // assuming you have a Loader component

function OrderPage() {
  const { id } = useParams();
  const { data: orderData, isLoading, error } = useGetOrderByIdQuery(id);
  

  
  const order = orderData?.order;
  const user = order?.user;
  const shipping = order?.shipping_address;

  return (
    <Container>
      <h2 className="mb-4">Order Details</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">
          {error?.data?.message || error?.error || "Something went wrong"}
        </Message>
      ) : (
        <Row>
          
          <Col md={8}>
            <ListGroup variant="flush">
              {/* Customer Info */}
              <ListGroup.Item>
                <h4>Customer Info</h4>
                <p>
                  <strong>Name:</strong> {user?.name} {user?.surename}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${user?.gmail}`}>{user?.gmail}</a>
                </p>
                <p>
                  <strong>Address:</strong> {shipping?.address}, {shipping?.city},{" "}
                  {shipping?.postal_code}, {shipping?.country}, {shipping?.phone}
                </p>
              </ListGroup.Item>

          
              <ListGroup.Item>
                <h4>Delivery Status</h4>
                {order?.is_delivered ? (
                  <Message type="success">
                    Delivered at {order?.delivered_at}
                  </Message>
                ) : (
                  <Message type="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

          
              <ListGroup.Item>
                <h4>Payment Method</h4>
                <p>
                  Method:{" "}
                  {order?.paymentMethod === "cod" ? (
                    <Badge bg="secondary">Cash on Delivery</Badge>
                  ) : (
                    <Badge bg="success">E-Sewa</Badge>
                  )}
                </p>
              </ListGroup.Item>

           
              <ListGroup.Item>
                <h4>Payment Status</h4>
                {order?.is_paid ? (
                  <Message type="success">
                    Paid at {order?.paid_at}
                  </Message>
                ) : (
                  <Message type="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

       
              <ListGroup.Item>
                <h2>Items:</h2>
                <ListGroup>
                  {order?.order_items?.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${order?.item_price?.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${order?.shipping_charge?.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order?.tax_price?.toFixed(2)}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Grand Total:</Col>
                    <Col>${order?.total_price?.toFixed(2)}</Col>
                  </Row>
                  {order?.payment_method !== "cod" && <Button className="btn btn-success my-2">Pay via E-sewa</Button>}
                  
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default OrderPage;