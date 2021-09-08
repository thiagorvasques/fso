import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";
import { message } from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdoteReducer);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const Filtered = anecdotes.filter((item) =>
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (anecdote) => {
    console.log("vote");
    dispatch(voteAction(anecdote));
    dispatch(message(`You voted ${anecdote.content}`, 5));
  };
  return (
    <div>
      {Filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
