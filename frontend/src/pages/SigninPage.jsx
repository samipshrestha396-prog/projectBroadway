import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useLoginMutation } from "../slices/userApiSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Message from "../components/Message";

function SigninPage() {
  const [error, setError] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [Login, { isLoading }] = useLoginMutation();
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const sp = new URLSearchParams(location.search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Login({ gmail, password }).unwrap();
      dispatch(setCredentials(res.user));
    } catch (err) {
      console.log(err?.data?.error || err?.error || err?.data?.error);
      setError(err?.data?.error || err?.error || err?.data?.error);
    }
  };

  return (
    <>
      <FormContainer>
        <h3>Login</h3>
        <Form onSubmit={LoginHandler}>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setGmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="success">
            Login
          </Button>
          <Button
            as={Link}
            to="/register"
            type="button"
            variant="primary"
            size="md"
            className="mx-2"
          >
            Register
          </Button>
        </Form>
        <Form.Group className="my-2 p-3 text-center">
          {" "}
          {error && <Message type="danger">{error}</Message>}
        </Form.Group>
      </FormContainer>
    </>
  );
}

export default SigninPage;
