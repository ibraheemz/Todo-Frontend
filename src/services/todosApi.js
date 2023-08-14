import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api/todos",
  timeout: "3000",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});
