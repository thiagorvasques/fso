import React from "react";
import Blog from "./Blog";
import "./styles/blog.css";

function BlogsList({ blogs, updateLike, deleteBlog, user }) {
  return (
    <div>
      <div>
        <button>All Blogs</button>
        <button>My blogs</button>
      </div>
      <ul>
        {blogs.map((blog, index) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              index={index}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BlogsList;
