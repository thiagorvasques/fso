import React from "react";
import "./styles/blog.css";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, deleteBlog } from "../reducers/blogListReducer";
import { useParams } from "react-router";
import Comments from "./Comments";
function Blog() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  return (
    <li className="blog">
      <div className="d-flex flex-column">
        <div className="content" id={blog.id}>
          <h3>
            {blog.title} {blog.author}
          </h3>
          <p>{blog.url}</p>
          <p id="likes">{blog.likes}</p>
          <button onClick={() => dispatch(likeAction(blog, blogs))}>
            Like
          </button>
          <Comments blog={blog} />
          {blog.user ? <p>Added by {blog.user.name}</p> : null}
          {blog.user !== undefined && blog.user.username === login.username ? (
            <div>
              <button onClick={(e) => dispatch(deleteBlog(blog, blogs))}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default Blog;
