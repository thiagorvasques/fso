import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const list = blogs.filter((blog) =>
    blog.user && blog.user.id === id ? blog : null
  );
  console.log("List of blogs", list);
  return (
    <div>
      {list.length > 0 ? (
        <div>
          <h1>{list[0].user.name}</h1>
          <h3>Added Blogs </h3>
          <ul>
            {list.map((item) => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ul>
        </div>
      ) : (
        <h1> No blogs from this user</h1>
      )}
    </div>
  );
}

export default User;
