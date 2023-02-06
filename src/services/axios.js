import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://128.199.94.149:8089/api/v1/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const HTTPR = axios.create({
  baseURL: "http://128.199.94.149:8089",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});
