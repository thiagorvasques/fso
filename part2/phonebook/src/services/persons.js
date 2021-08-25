import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, update };
