import React, { useState, useRef, useEffect, useMemo } from "react";

function BlogsList({ setBlogs, blogs, updateLike, deleteBlog, user }) {
  const refs = useMemo(
    () => Array.from({ length: blogs.length }).map(() => React.createRef()),
    [blogs.length]
  );

  const toogle = (e, index) => {
    let display = refs[index].current.style.display;

    if (display === "none") {
      refs[index].current.style.display = "block";
      e.target.innerHTML = "Hide";
    } else {
      refs[index].current.style.display = "none";
      e.target.innerHTML = "View";
    }
  };

  return (
    <div>
      <div>
        <button>All Blogs</button>
        <button>My blogs</button>
      </div>
      {blogs.map((blog, index) => {
        console.log(user.username);
        return (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <button onClick={(e) => toogle(e, index)} value={index}>
              View
            </button>

            <div ref={refs[index]} style={{ display: "none" }} id={blog.id}>
              <p>{blog.author}</p>
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
              {blog.user !== undefined &&
              blog.user.username === user.username ? (
                <button
                  onClick={(e) =>
                    deleteBlog(e, blog.id, blog.title, blog.author)
                  }
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BlogsList;
