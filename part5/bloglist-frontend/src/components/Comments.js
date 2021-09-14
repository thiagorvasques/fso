import React from "react";
import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../reducers/blogListReducer";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
function Comments({ blog }) {
  const comment = useField("text");
  console.log("this is the comment", comment);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const commentObj = {
    comment: comment.value,
  };
  return (
    <div>
      <Container>
        <Form
          onSubmit={(e) =>
            dispatch(createComment(e, blog.id, commentObj, blog, blogs))
          }
        >
          <Row className="mt-3">
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control as="textarea" rows={1} {...comment} />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" className="position-relative">
                Add Comment
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <ListGroup>
        {blog.comments.map((item, i) => {
          return <ListGroupItem key={i}>{item}</ListGroupItem>;
        })}
      </ListGroup>
    </div>
  );
}

export default Comments;
