import React from "react";
import { connect } from "react-redux";
import { message } from "../reducers/notificationReducer";
import { addAction } from "../reducers/anecdoteReducer";

function AnecdoteForm(props) {
  //const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    props.message(`New anecdote created: ${anecdote}`, 5);
    e.target.anecdote.value = "";
    props.addAction(anecdote);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default connect(null, { message, addAction })(AnecdoteForm);
