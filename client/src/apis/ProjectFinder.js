import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/projects"
    : "http://localhost:3001/api/projects";

export default axios.create({
  baseURL,
});
