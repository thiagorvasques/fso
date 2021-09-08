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

export default { getAll, createAnecdote };
