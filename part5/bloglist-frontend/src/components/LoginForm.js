import React from "react";
import { Form } from "react-bootstrap";
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
      <Form>
        <h1> Login to application </h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        </Form>
        <h1>Log in to application</h1>

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
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
