import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  console.log(anecdotes);
  const id = useParams().id;
  console.log(id);
  const single = anecdotes.find((anecdote) => id === anecdote.id);
  console.log(single);
  return (
    <div>
      <h2>
        {single.content} by {single.author}
      </h2>
      <p>Has {single.votes} votes</p>
    </div>
  );
};

export default Anecdote;
