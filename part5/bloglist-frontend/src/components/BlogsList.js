import React from "react";
import Blog from "./Blog";
import "./styles/blog.css";
import {useSelector} from "react-redux"


function BlogsList() {

  const blogs = useSelector(state => state.blogs);
  console.log("Sorted List" , blogs);

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
              blogs={blogs}
              // index={index}
              // updateLike={updateLike}
              // deleteBlog={deleteBlog}
              // user={user}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BlogsList;
