import axios from "axios";

/** Browser-relative API client so load-more works on localhost and production. */
const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
