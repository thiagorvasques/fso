import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { LOGIN } from "../queries";

function LoginForm({ setError, setToken, show, token, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("loggedIn", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ variables: { username: username, password: password } });
    setPage("authors");
  };
  if (!show) {
    return null;
  }

  if (!token) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return <div></div>;
}

export default LoginForm;
