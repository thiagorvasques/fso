import React from "react";
import BlogsList from "./BlogsList";

function BlogForm({ handleNewBlog, saveNewBlog, setBlogs, blogs }) {
  return (
    <div>
       <form onChange={(e) => handleNewBlog(e)}>
        <input type="text" name="title" />
        <input type="text" name="author" />
        <input type="text" name="url" />
        <button type="submit" onClick={(e) => saveNewBlog(e)}>
          save
        </button>
        <BlogsList setBlogs={setBlogs} blogs={blogs}/>
      </form>
    </div>
  );
}

export default BlogForm;
