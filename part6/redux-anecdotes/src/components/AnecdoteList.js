import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAction, filterAction } from "../reducers/anecdoteReducer";
import { close, messageOnVote } from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdoteReducer);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterAction(filter));
  }, [dispatch, filter]);

  const vote = (id, content) => {
    console.log("vote", id);
    dispatch(voteAction(id));
    dispatch(messageOnVote(content));
    setTimeout(() => {
      dispatch(close());
    }, 5000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
