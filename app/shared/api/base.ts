import axios from "axios";
import { SERVER_TOKEN, SERVER_URL } from "../config/server";

export const apiInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${SERVER_TOKEN}`,
  },
});
