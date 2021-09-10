import blogService from "../services/blogService";
import loginService from "../services/login";
import { messageAction } from "./notificationReducer";

const userStatus = null;
const initialState = userStatus;

export const loginAction = (e, user) => {
  console.log("loginAction called");
  //console.log(user);
  return async (dispatch) => {
    e.preventDefault();
    try {
      const response = await loginService.login(user);
      //console.log(response);
      window.localStorage.setItem("loggedin", JSON.stringify(response));
      blogService.setToken(response.token);
      dispatch({ type: "LOGIN", data: response });
    } catch (error) {
      dispatch(messageAction("Wrong Credential"));
    }
  };
};

export const loggedInAction = () => {
  console.log("loggedInAction called");
  return async (dispatch) => {
    const loggedUserJSON = await window.localStorage.getItem("loggedin");
    console.log("user on local storage:", loggedUserJSON);
    if (loggedUserJSON) {
      console.log("if there is user on localstorage, move on");
      const logged = JSON.parse(loggedUserJSON);
      console.log("json parse user", logged);
      dispatch({ type: "LOGGEDIN", data: logged });
      console.log();
      blogService.setToken(logged.token);
    }
  };
};

export const logoutAction = () => {
  window.localStorage.clear();
  return { type: "LOGOUT" };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("when login state is", state);
      return action.data;
    case "LOGGEDIN":
      console.log("when logged in state is", state);
      return action.data;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
