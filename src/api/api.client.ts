import axios from "axios";

const serverUrl = "https://dummyjson.com";

export const api = axios.create({
  baseURL: serverUrl,
});
