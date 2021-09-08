import React from "react";
import { useDispatch } from "react-redux";
import { addAction } from "../reducers/anecdoteReducer";
import { close, messageNewAnecdote } from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(addAction(anecdote));
    dispatch(messageNewAnecdote(anecdote));
    setTimeout(() => {
      dispatch(close());
    }, 5000);
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

export default AnecdoteForm;
