import React from "react";

import "./styles/blog.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogsList() {
  const blogs = useSelector((state) => state.blogs);
  console.log("Sorted List", blogs);

  return (
    <div>
      {blogs.map((blog, index) => {
        return (
          <div className="blog" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default BlogsList;
