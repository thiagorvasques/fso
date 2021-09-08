import React from "react";
import { useDispatch } from "react-redux";
import { addAction } from "../reducers/anecdoteReducer";
import { message } from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(message(`New anecdote created: ${anecdote}`, 5));
    e.target.anecdote.value = "";
    dispatch(addAction(anecdote));
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
