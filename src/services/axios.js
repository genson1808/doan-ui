import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://128.199.100.61/api/v1/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const HTTPR = axios.create({
  baseURL: "http://128.199.100.61",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});
