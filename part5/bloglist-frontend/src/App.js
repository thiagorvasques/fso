import React, { useState, useEffect } from "react";
import Logged from "./components/Logged";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogService";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogsList from "./components/BlogsList";
import { useSelector, useDispatch } from "react-redux";
import { getAllAction } from "./reducers/blogListReducer";

import { loggedInAction } from "./reducers/loginReducer";
import Users from "./components/Users";
import { getUsers } from "./reducers/userReducers";

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
    <div>
      {user === null ? (
        <div>
          <LoginForm />
          <Notification message={message} />
        </div>
      ) : (
        <div>
          <Logged />
          <Notification message={message} />
          <Users />
          <BlogForm />
          <BlogsList />
        </div>
      )}
    </div>
  );
};

export default App;
