const notification = null;

const initialState = notification;

export const messageOnVote = (id) => {
  return { type: "SET_NOTIFICATION", data: id };
};

export const close = () => {
  return { type: "CLOSE_NOTIFICATION" };
};

export const messageNewAnecdote = (anecdote) => {
  return { type: "NEW_ANECDOTE", data: anecdote };
};

const notificationReducer = (state = initialState, action) => {
  let msg = "";
  switch (action.type) {
    case "SET_NOTIFICATION":
      msg = `You voted ${action.data}`;
      return msg;
    case "NEW_ANECDOTE":
      msg = `Anecdote created: ${action.data}`;
      return msg;
    case "CLOSE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
