import React, { useEffect } from "react";
import blogService from "../services/blogService";

function BlogsList({ setBlogs, blogs }) {
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => {
  //     console.log(blogs);
  //     setBlogs(blogs);
  //   })
  // }, [blogs, setBlogs]);

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BlogsList;
