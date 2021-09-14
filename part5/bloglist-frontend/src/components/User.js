import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const list = blogs.filter((blog) =>
    blog.user && blog.user.id === id ? blog : null
  );
  console.log("List of blogs", list);
  return (
    <div>
      {list.length > 0 ? (
        <Card>
          <Card.Header>{list[0].user.name}</Card.Header>
          <Card.Title className="m-3">Added Blogs</Card.Title>
          <Card.Body>
            <ListGroup>
              {list.map((item) => {
                return (
                  <ListGroupItem key={item.id}>{item.title}</ListGroupItem>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Header> No blogs from this user</Card.Header>
        </Card>
      )}
    </div>
  );
}

export default User;
