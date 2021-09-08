import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer, { initAction } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdote";

const combReducer = combineReducers({
  anecdoteReducer: reducer,
  notReducer: notificationReducer,
  filter: filterReducer,
});
export const store = createStore(combReducer, composeWithDevTools());

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(initAction(anecdotes)));

console.log(store.getState());
