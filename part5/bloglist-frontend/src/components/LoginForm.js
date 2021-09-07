import React from "react";

function LoginForm(props) {
  return (
    <div>
      <h1>Log in to application</h1>

      <form onSubmit={(event) => props.handleLogin(event)}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">  
          login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
