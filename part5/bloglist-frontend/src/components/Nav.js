import React from "react";
import { Link } from "react-router-dom";
import Logged from "./Logged";
function Nav() {
  return (
    <nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <Logged />
    </nav>
  );
}

export default Nav;
