import userService from "../services/userService";
const users = [];

const initialState = users;

export const getUsers = () => {
  return async (dispatch) => {
    console.log("getuser called");
    try {
      const response = await userService.getAll();
      dispatch({ type: "GET_USER", data: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userGet = (id, users) => {
  let user = users.find((user) => user.id === id);
  return { type: "USER_GET", data: user };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.data;
    case "USER_GET":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
