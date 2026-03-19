import { Row, Col, Form, Button, Table } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetmyOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes, FaCheck } from "react-icons/fa";
import {Link} from "react-router";

function ProfilePage() {


  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetmyOrdersQuery();
  const orders = data?.orders;

  const [name, setName] = useState(userInfo.name);
  const [surename, setSurename] = useState(userInfo.surename);
  const [gmail, setGmail] = useState(userInfo.gmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  return (
    <Row>
      <Col md={5}>
        <FormContainer>
          <h2> Profile</h2>
          <Form>
            <Form.Group className="my-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="Surename">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                value={surename}
                type="text"
                onChange={(e) => setSurename(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="gmail">
              <Form.Label>Gmail</Form.Label>
              <Form.Control
                value={gmail}
                type="gmail"
                onChange={(e) => setGmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                type="password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button type="submit">Update</Button>
        </FormContainer>
      </Col>
      <Col md={6}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="danger">{error.data.error}</Message>
        ) : orders == 0?<Message type="info">You haven't placed order yet.<Link to="/">Go Back</Link></Message>: (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRICE</th>
                <th>CREATED AT</th>
                <th>DELIVERED</th>
                <th>PAID</th>
                <></>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.total_price}</td>
                  <td>{order.createdAt.substr(0, 10)}</td>
                  <td>{order.is_delivered ? <FaCheck /> : <FaTimes style={{color:"red"}} />}</td>
                  <td>{order.is_paid ? <FaCheck style={{color:"green"}} /> : <FaTimes />}</td>
                  <td>
                    <Link
                      to={`/order/${order._id}`}
                      className="btn btn-primary"
                    >
                     Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}




export default ProfilePage

