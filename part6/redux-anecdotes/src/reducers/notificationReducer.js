const notification = null;

const initialState = notification;

export const message = (content, timer) => {
  return async (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: content });
    setTimeout(() => {
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
    default:
      return state;
  }
};

export default notificationReducer;
