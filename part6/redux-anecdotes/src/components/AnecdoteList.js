import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction, filterAction } from "../reducers/anecdoteReducer";
import { message } from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdoteReducer);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterAction(filter));
  }, [dispatch, filter]);

  const vote = (anecdote) => {
    console.log("vote");
    dispatch(voteAction(anecdote));
    dispatch(message(`You voted ${anecdote.content}`, 5));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
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
