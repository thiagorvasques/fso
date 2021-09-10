import React from "react";
import Togglable from "./Toggable";

import { addBlogAction } from "../reducers/blogListReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/index";

function BlogForm() {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  //console.log(title, author, url);

  const blog = {
    title: title.value,
    author: author.value,
    url: url.value,
  };
  return (
    <div className="formDiv">
      <Togglable buttonLabel="Create new blog">
        <form>
          <input {...title} />
          <input {...author} />
          <input {...url} />
          <button
            type="submit"
            onClick={(e) => dispatch(addBlogAction(e, blog))}
            id="save"
          >
            save
          </button>
        </form>
      </Togglable>
    </div>
  );
}

export default BlogForm;
