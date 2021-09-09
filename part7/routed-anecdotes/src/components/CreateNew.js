import React from "react";
import { useHistory } from "react-router";
import useField from "../hooks";
const CreateNew = (props) => {
  const history = useHistory();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const reset = useField("button");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.setNotification(`A new anecdote ${content.value} created`);
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="button" onClick={handleSubmit}>
          create
        </button>
        <button onClick={reset.onClick}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
