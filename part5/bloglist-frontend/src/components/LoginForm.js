import React from "react";

function LoginForm(props) {
  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={(event) => props.handleLogin(event)}>
        <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
