import React from "react";
import "./styles/blog.css";
import Togglable from "./Toggable";

function Blog({ blog, updateLike, deleteBlog, user }) {
  return (
    <li className="blog">
      <div className="d-flex flex-column">
        <div className="content">
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <Togglable buttonLabel={"View"}>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <button
              onClick={(e) =>
                updateLike(
                  e,
                  blog.title,
                  blog.author,
                  blog.url,
                  blog.likes,
                  blog.id
                )
              }
            >
              Like
            </button>
            {blog.user !== undefined && blog.user.username === user.username ? (
              <button
                onClick={(e) => deleteBlog(e, blog.id, blog.title, blog.author)}
              >
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
