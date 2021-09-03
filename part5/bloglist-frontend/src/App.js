import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import blogService from "./services/blogService";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlog");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log(blogs);
      setBlogs(
        blogs.sort((a, b) =>
          a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
        )
      );
    });
  }, []);

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlog", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setShowNotification(true);
      setMessage("Wrong credentials");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage(null);
        setShowNotification(false);
      }, 5000);
    }
  };

  const handleNewBlog = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const saveNewBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.createBlog(newBlog);
      setBlogs(await blogService.getAll());
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author}`);
      setShowNotification(true);
      setTimeout(() => {
        setMessage("");
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      setMessage("Content missing");
      setShowNotification(true);
      setTimeout(() => {
        setMessage("");
        setShowNotification(false);
      }, 3000);
    }
  };

  const updateLike = async (e, title, author, url, likes, id) => {
    //console.log(e, title, author, url, likes, typeof id);
    e.preventDefault();
    const blog = {
      title,
      author,
      url,
      likes: likes + 1,
      id,
    };
    let updated = false;
    try {
      await blogService.updateLike(id, blog);
      updated = true;
    } catch (error) {
      console.log(error);
    }

    if (updated) {
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === id) {
            return {
              ...blog,
              likes: blog.likes + 1,
            };
          }
          return blog;
        })
      );
    }
  };

  const deleteBlog = async (e, id, title, author) => {
    console.log("delete Blog", id);
    const response = await blogService.deleteBlog(id);
    const confirm = window.confirm(`Remove blog ${title} by ${author}`);
    console.log(response);
    if (confirm) {
      setBlogs(
        blogs.filter((blog) => {
          return blog.id !== id;
        })
      );
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            message={message}
            showNotification={showNotification}
          />
          {showNotification ? <Notification message={message} /> : null}
        </div>
      ) : (
        <div>
          <Blog user={user} logout={logout} />
          {showNotification ? <Notification message={message} /> : null}
          <BlogForm
            handleNewBlog={handleNewBlog}
            saveNewBlog={saveNewBlog}
            setBlogs={setBlogs}
            blogs={blogs}
            updateLike={updateLike}
            deleteBlog={deleteBlog}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
