const notification = null;

const initialState = notification;

export const messageAction = (message) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: message });
    setTimeout(() => {
      dispatch({ type: "CLOSE_N" });
    }, 5000);
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLOSE_N":
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
