import React from "react";
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
    </div>
  );
}

export default LoginForm;
