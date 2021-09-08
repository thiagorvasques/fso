import axios from "axios";
import { getId } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (newAnecdote) => {
  const newObject = {
    content: newAnecdote,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const vote = async (voted) => {
  console.log(voted);
  const newObject = {
    content: voted.content,
    id: voted.id,
    votes: voted.votes,
  };

  const response = await axios.put(`${baseUrl}/${voted.id}`, newObject);
  return response;
};

export default { getAll, createAnecdote, vote };
