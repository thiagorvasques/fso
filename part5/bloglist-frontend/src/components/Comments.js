import React from "react";
import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../reducers/blogListReducer";

function Comments({ blog }) {
  const comment = useField("text");
  console.log("this is the comment", comment);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const commentObj = {
    comment: comment.value,
  };
  return (
    <div>
      <form
        onSubmit={(e) =>
          dispatch(createComment(e, blog.id, commentObj, blog, blogs))
        }
      >
        <input {...comment} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default Comments;
