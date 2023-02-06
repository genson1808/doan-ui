import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://rogger1808.xyz/api/v1/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const HTTPR = axios.create({
  baseURL: "https://rogger1808.xyz/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});
