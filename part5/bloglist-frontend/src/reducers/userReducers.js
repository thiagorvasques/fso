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

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
