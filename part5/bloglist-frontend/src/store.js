import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import blogListReducer from "./reducers/blogListReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducers";

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogListReducer,
  login: loginReducer,
  users: userReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
