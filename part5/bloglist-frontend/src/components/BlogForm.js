import React, { useRef } from "react";
import Togglable from "./Toggable";
import { addBlogAction } from "../reducers/blogListReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/index";
import { Form, Button } from "react-bootstrap";

function BlogForm() {
  const dispatch = useDispatch();
  const toggle = useRef(null);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const blog = {
    title: title.value,
    author: author.value,
    url: url.value,
  };
  return (
    <div className="formDiv">
      <Togglable buttonLabel="Create new blog" toggle={toggle}>
        <Form className="m-3  ">
          <Form.Group className="mt-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...author}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...url}
            />
          </Form.Group>
          <Button
            ref={toggle}
            variant="primary"
            type="submit"
            onClick={(e) => dispatch(addBlogAction(e, blog))}
            id="save"
          >
            Create New Blog
          </Button>
        </Form>
      </Togglable>

      {/* <form>
          <input {...title} />
          <input {...author} />
          <input {...url} />
          <button
            type="submit"
            onClick={(e) => dispatch(addBlogAction(e, blog))}
            id="save"
          >
            save
          </button>
        </form> */}
    </div>
  );
}

export default BlogForm;
