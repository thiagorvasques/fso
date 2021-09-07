import React, { useState } from "react";
import Togglable from "./Toggable";
import blogService from "../services/blogService";
import PropTypes from "prop-types";

function BlogForm({ setBlogs, setMessage, setShowNotification }) {
  const [newBlog, setNewBlog] = useState({});
  const handleNewBlog = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };
  const saveNewBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.createBlog(newBlog);
      setBlogs(await blogService.getAll());
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author}`);
      setShowNotification(true);
      setTimeout(() => {
        setMessage("");
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      setMessage("Content missing");
      setShowNotification(true);
      setTimeout(() => {
        setMessage("");
        setShowNotification(false);
      }, 3000);
    }
  };
  BlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    setShowNotification: PropTypes.func.isRequired,
  };
  return (
    <div className="formDiv">
      <Togglable buttonLabel="Create new blog">
        <form onChange={handleNewBlog}>
          <input type="text" name="title" placeholder="Title" id="title" />
          <input type="text" name="author" placeholder="Author" id="author" />
          <input type="text" name="url" placeholder="URL" id="url" />
          <button type="submit" onClick={saveNewBlog} id="save">
            save
          </button>
        </form>
      </Togglable>
    </div>
  );
}

export default BlogForm;
