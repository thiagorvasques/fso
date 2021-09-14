import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  console.log(props.toggle);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="container ">
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility} id="new">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div className="d-flex flex-column">
          {props.children}

          <Button
            variant="primary"
            onClick={toggleVisibility}
            className="position-absolute"
          >
            Hide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Togglable;
