import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/">
        <a href="http://localhost:3000" style={padding}>
          anecdotes
        </a>
      </Link>
      <Link to="/create">
        <a href="http://localhost:3000/create" style={padding}>
          create new
        </a>
      </Link>
      <Link to="/about">
        <a href="http://localhost:3000/about" style={padding}>
          about
        </a>
      </Link>
      {props.notification ? <p>{props.notification} </p> : null}
    </div>
  );
};

export default Menu;
