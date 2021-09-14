import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, deleteBlog } from "../reducers/blogListReducer";
import { useParams } from "react-router";
import Comments from "./Comments";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  return (
    <div>
      <Card>
        <Card.Header as="h5">{blog.url}</Card.Header>
        <Card.Body>
          <Card.Title>
            {blog.title} {blog.author}
          </Card.Title>
          <Card.Text>{blog.likes}</Card.Text>
          <Button onClick={() => dispatch(likeAction(blog, blogs))}>
            Like
          </Button>
        </Card.Body>
      </Card>
      <Container>
        <Comments blog={blog} />
        {blog.user ? <p>Added by {blog.user.username}</p> : null}
        {blog.user !== undefined && blog.user.username === login.username ? (
          <div>
            <Link to="/">
              <Button onClick={(e) => dispatch(deleteBlog(blog, blogs))}>
                Delete
              </Button>
            </Link>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default Blog;
