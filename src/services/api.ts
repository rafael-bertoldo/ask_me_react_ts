import axios from "axios";

const api = axios.create({
  baseURL: "https://ask-demo-node.herokuapp.com",
});

export default api;
