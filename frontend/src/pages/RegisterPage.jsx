import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router";
import { useState } from "react";
import { useRegisterMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCredentials } from "../slices/authSlice";

function RegisterPage() {
  const [Register, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [surename, setSurename] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await Register({ name, surename, gmail, password }).unwrap();
      // dispatch(setCredentials(res));
      navigate("/signin");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FormContainer>
      <h3 className="text-center">Registration:</h3>
      <Form onSubmit={registerHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="my-2" controlId="surename">
          <Form.Label>last Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setSurename(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="gmail">
          <Form.Label>Gmail:</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setGmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary my-2" style={{width:"100%"}} >
          Create Account
        </Button>
      </Form>
    </FormContainer>
  );
}
export default RegisterPage;
