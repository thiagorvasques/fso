import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const combReducer = combineReducers({
  anecdoteReducer: reducer,
  notReducer: notificationReducer,
  filter: filterReducer,
});
export const store = createStore(combReducer, composeWithDevTools());

console.log(store.getState());
