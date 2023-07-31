import axios from "axios";
import config from "./config";

const API = axios.create({
  baseURL: config.BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
