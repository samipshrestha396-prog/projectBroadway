import { useParams } from "react-router";
import { Row, Col, ListGroup, Container, Badge } from "react-bootstrap";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";

function OrderPage() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(id);

  const user = order?.orders?.user;
  const shipping = order?.orders?.shipping_address;

  return (
    <Container>
      <h2 className="mb-4">Order Details</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
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
              {order?.orders?.is_delivered ? (
                <Message type="success">
                  Delivered at {order?.orders?.delivered_at}
                </Message>
              ) : (
                <Message type="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                Method:{" "}
                {order?.orders?.paymentMethod === "cod" ? (
                  <Badge bg="secondary">Cash on Delivery</Badge>
                ) : (
                  <Badge bg="success">E-Sewa</Badge>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Status</h4>
              {order?.orders?.is_paid ? (
                <Message type="success">
                  Paid at {order?.orders?.paid_at}
                </Message>
              ) : (
                <Message type="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}></Col>
      </Row>
    </Container>
  );
}

export default OrderPage;
