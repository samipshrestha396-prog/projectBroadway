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
import {
  useDeliverOrderMutation,
  useGetEsewaPaymentDetailsQuery,
} from "../slices/orderApiSlice";
import { useGetOrderByIdQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
function OrderPage() {
  const { id } = useParams();
  const { data: orderData, isLoading, error,refetch } = useGetOrderByIdQuery(id);
  const { data: paymentDetails } = useGetEsewaPaymentDetailsQuery(id);
  const [deliverOrder, {}] = useDeliverOrderMutation();
  const order = orderData?.order;
  const { userInfo } = useSelector((state) => state.auth);

  const user = order?.user;
  const shipping = order?.shipping_address;
  const handleEsewaPayment = () => {
    const form = document.createElement("form");
    form.method = "post"; // form.setAttribute("method","post")
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    for (const key in paymentDetails.details) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.setAttribute("value", paymentDetails.details[key]);

      form.appendChild(input);
    }
    document.body.appendChild(form);

    form.submit();
    // console.log(form);
  };

  const handleDeliverOrder = async () => {
    try {
      const res = await deliverOrder({ orderId: order._id }).unwrap();
      refetch()
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

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
                  <strong>Address:</strong> {shipping?.address},{" "}
                  {shipping?.city}, {shipping?.postal_code}, {shipping?.country}
                  , {shipping?.phone}
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
                  Method:
                  {order?.payment_method === "cod" ? (
                    <Badge bg="secondary">Cash on Delivery</Badge>
                  ) : (
                    <Badge bg="success">E-Sewa</Badge>
                  )}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Payment Status</h4>
                {order?.is_paid ? (
                  <Message type="success">Paid at {order?.paid_at}</Message>
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
                    <Col>${order.item_price}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${order.shipping_charge}</Col>
                  </Row>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.tax_price}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Grand Total:</Col>
                    <Col>${order?.total_price}</Col>
                  </Row>
                  {order?.payment_method !== "cod" &&
                    !order.is_paid &&
                    !userInfo.is_admin && (
                      <Button
                        className="btn btn-success my-2"
                        onClick={handleEsewaPayment}
                      >
                        Pay via E-sewa
                      </Button>
                    )}
                </ListGroup.Item>
                {userInfo.is_admin && !order.is_delivered && (
                  <ListGroup.Item>
                    <Button className="btn btn-success"  onClick={handleDeliverOrder} disabled={!order.is_paid}>
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default OrderPage;
