import blogService from "../services/blogService";
import { messageAction } from "./notificationReducer";

const blogs = [];

const initalState = blogs;

export const getAllAction = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    response.sort((a, b) =>
      a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
    );
    dispatch({ type: "GET_ALL", data: response });
  };
};

export const addBlogAction = (e, blog) => {
  return async (dispatch) => {
    e.preventDefault();
    try {
      const response = await blogService.createBlog(blog);
      dispatch({ type: "ADD_BLOG", data: response });
      dispatch(messageAction(`A new blog ${blog.title} by ${blog.author}`));
    } catch (error) {
      dispatch(messageAction("Content missing"));
    }
  };
};

export const likeAction = (blog, blogs) => {
  return async (dispatch) => {
    // e.preventDefault();
    const liked = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.updateLike(blog.id, liked);
      const updated = blogs
        .map((item) => (item.id === response.id ? response : item))
        .sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
      console.log(updated);
      await dispatch({ type: "UPDATE_LIKE", data: updated });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBlog = (blog, blogs) => {
  return async (dispatch) => {
    try {
      console.log(blog, blog.id);
      await blogService.deleteBlog(blog.id);
      let updated = blogs.filter((item) => item.id !== blog.id);
      dispatch({ type: "DELETE", data: updated });
    } catch (error) {
      console.log(error);
    }
  };
};

const blogListReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_ALL":
      return action.data;
    case "ADD_BLOG":
      return state.concat(action.data);
    case "UPDATE_LIKE":
      return action.data;
    case "DELETE":
      return action.data;
    default:
      return state;
  }
};

export default blogListReducer;
