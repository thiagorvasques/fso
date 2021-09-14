import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginAction } from "../reducers/loginReducer";

function LoginForm(props) {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");
  const user = {
    username: username.value,
    password: password.value,
  };

  return (
    <div>
      <h1> Login to application </h1>
      <Form onSubmit={(e) => dispatch(loginAction(e, user))}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...username}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* <h1>Log in to application</h1>

      <form onSubmit={(e) => dispatch(loginAction(e, user))}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form> */}
    </div>
  );
}

export default LoginForm;
