import React from "react";
import "./styles/blog.css";
import Togglable from "./Toggable";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, deleteBlog } from "../reducers/blogListReducer";

function Blog({ blog, blogs }) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  console.log(login.username);
  return (
    <li className="blog">
      <div className="d-flex flex-column">
        <div className="content" id={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <Togglable buttonLabel={"View"}>
            <p>{blog.url}</p>
            <p id="likes">{blog.likes}</p>
            <button onClick={(e) => dispatch(likeAction(blog, blogs))}>
              Like
            </button>
            {blog.user !== undefined &&
            blog.user.username === login.username ? (
              <button onClick={(e) => dispatch(deleteBlog(blog, blogs))}>
                Delete
              </button>
            ) : null}
          </Togglable>
        </div>
      </div>
    </li>
  );
}

export default Blog;
