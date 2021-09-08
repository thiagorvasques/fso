import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const combReducer = combineReducers({
  anecdoteReducer: reducer,
  notReducer: notificationReducer,
  filter: filterReducer,
});
export const store = createStore(
  combReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// anecdoteService
//   .getAll()
//   .then((anecdotes) => store.dispatch(initAction(anecdotes)));

// console.log(store.getState());
