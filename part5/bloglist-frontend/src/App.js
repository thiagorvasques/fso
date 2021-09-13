import React, { useEffect } from "react";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogsList from "./components/BlogsList";
import Blog from "./components/Blog";
import { useSelector, useDispatch } from "react-redux";
import { getAllAction } from "./reducers/blogListReducer";
import { loggedInAction } from "./reducers/loginReducer";
import Users from "./components/Users";
import { getUsers } from "./reducers/userReducers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/User";
import Nav from "./components/Nav";
const App = () => {
  const dispatch = useDispatch();
  //redux states
  const message = useSelector((state) => state.notification);
  const user = useSelector((state) => state.login);
  //console.log(user);
  console.log("user statur on first load", user);
  useEffect(() => {
    dispatch(loggedInAction());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getAllAction());
      dispatch(getUsers());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div className="container">
        {user === null ? (
          <div>
            <Route exact path="/">
              <LoginForm />
              <Notification message={message} />
            </Route>
          </div>
        ) : (
          <div>
            <Nav />
            <Switch>
              <Route exact path="/">
                <Notification message={message} />
                <BlogForm />
                <BlogsList />
              </Route>
              <Route path="/blogs/:id">
                <Blog />
              </Route>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route>
                <Users exact path="/users" />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
