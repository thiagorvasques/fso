import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  //console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  //console.log(response.data);
  return response.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log(response.data);
  return response.data;
};

const updateLike = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, setToken, createBlog, updateLike, deleteBlog };
