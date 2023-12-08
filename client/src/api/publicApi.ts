import axios from "axios";
import { BASE_URL } from "./common";

export const $publicApi = axios.create({
  baseURL: BASE_URL,
});
