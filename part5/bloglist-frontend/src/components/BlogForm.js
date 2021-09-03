import React from "react";
import BlogsList from "./BlogsList";
import Togglable from "./Toggable";

function BlogForm({
  handleNewBlog,
  saveNewBlog,
  setBlogs,
  blogs,
  updateLike,
  deleteBlog,
  user,
}) {
  return (
    <div>
      <Togglable buttonLabel="Create new blog">
        <form onChange={(e) => handleNewBlog(e)}>
          <input type="text" name="title" />
          <input type="text" name="author" />
          <input type="text" name="url" />
          <button type="submit" onClick={(e) => saveNewBlog(e)}>
            save
          </button>
        </form>
      </Togglable>

      <BlogsList
        setBlogs={setBlogs}
        blogs={blogs}
        updateLike={updateLike}
        deleteBlog={deleteBlog}
        user={user}
      />
    </div>
  );
}

export default BlogForm;
