import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../reducers/loginReducer";

function Blog() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Blogs</h1>
      <p>{login.username} logged in</p>
      <button type="button" onClick={() => dispatch(logoutAction())}>
        Logout
      </button>
    </div>
  );
}

export default Blog;
