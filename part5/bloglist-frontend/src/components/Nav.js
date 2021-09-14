import React from "react";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../reducers/loginReducer";

function NavBar() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  return (
    <Nav variant="tabs" className="p-2">
      <Nav.Item>
        <Nav.Link href="/" eventkey="link-0">
          {/* <Link to="/">Blogs</Link> */} Blogs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/users" eventkey="link-1">
          {/* <Link to="/users">Users</Link> */} Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {login.username} logged in
        <Link to="/">
          <Button
            variant="primary"
            type="button"
            onClick={() => dispatch(logoutAction())}
            id="save"
            className="ml-2"
          >
            Logout
          </Button>
        </Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
