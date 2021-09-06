import React from "react";

function Blog({ user, logout }) {
  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Blog;
