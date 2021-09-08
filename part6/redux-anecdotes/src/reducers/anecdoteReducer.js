// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];
// const initialState = anecdotesAtStart.map(asObject);
// const asObject = (anecdote) => {
// return {
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// };
// };
import anecdoteService from "../services/anecdote";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const voteAction = (anecdote) => {
  console.log(anecdote);
  return async (dispatch) => {
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdoteService.vote(voted);
    dispatch({ type: "INCREMENT", data: anecdote.id });
  };
};

export const addAction = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote);
    dispatch({
      type: "ADD",
      data: newAnecdote,
    });
  };
};

export const initAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    anecdotes.sort((a, b) =>
      a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
    );
    dispatch({ type: "INIT_ANECDOTE", data: anecdotes });
  };
};
export const filterAction = (filter) => {
  console.log("filterAction:", filter);
  return { type: "FILTER", data: filter };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "INCREMENT": {
      const id = action.data;
      const toChange = state.find((n) => id === n.id);
      console.log(toChange);
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };

      return state
        .map((item) => (item.id !== id ? item : changed))
        .sort((a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0));
    }
    case "ADD": {
      const anecdote = action.data;
      return state.concat(anecdote);
    }
    case "FILTER":
      return action.data === null
        ? []
        : state.filter(
            (el) =>
              el.content.toLowerCase().indexOf(action.data.toLowerCase()) !== -1
          );
    case "INIT_ANECDOTE":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
