import React from "react";
import { useDispatch } from "react-redux";
import { addAction } from "../reducers/anecdoteReducer";
import { close, messageNewAnecdote } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    dispatch(messageNewAnecdote(anecdote));
    setTimeout(() => {
      dispatch(close());
    }, 5000);
    const newAnecdote = await anecdoteService.createAnecdote(anecdote);
    dispatch(addAction(newAnecdote));
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
