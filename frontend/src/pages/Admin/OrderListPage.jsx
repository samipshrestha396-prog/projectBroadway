import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Message from "../../components/Message";
import { Button, Container, Table } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
function OrderListPage() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <Container>
      <h2>orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.error}</Message>
      ) : (
   
         <Table striped hover responsive size="sm" className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>USER</th>
              <th>PRICE</th>
              <th>DELIVERED AT</th>
              <th>PAID </th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substr(0, 10)}</td>
                <td>{order.user?`${order.user.name} ${order.user.surename}`:""}</td>
                <td>${order.total_price}</td>
                <td>
                  {order.is_delivered ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  {order.is_paid ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
              <td>
                <Button  as={Link} to={`/order/${order._id}`}  className="btn-primary">Details</Button>
              </td>
              </tr>
            ))}
          </tbody>
        </Table>
       
      )}
    </Container>
  );
}

export default OrderListPage;
