const notification = null;

const initialState = notification;

let timeout;
export const message = (content, timer) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: content });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: "CLOSE_NOTIFICATION" });
    }, timer * 1000);
  };
};

const notificationReducer = (state = initialState, action) => {
  let msg = "";
  switch (action.type) {
    case "SET_NOTIFICATION":
      msg = `${action.data}`;
      return msg;
    case "CLOSE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
