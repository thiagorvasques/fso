import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
