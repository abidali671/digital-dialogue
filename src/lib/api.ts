import axios from "axios";
import config from "./config";

const API = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
