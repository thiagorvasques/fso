import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import "./styles/blog.css";
import blogService from "../services/blogService";

function BlogsList({ blogs, updateLike, deleteBlog, user, setBlogs }) {
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log(blogs);
      setBlogs(
        blogs.sort((a, b) =>
          a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
        )
      );
    });
  }, []);
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
