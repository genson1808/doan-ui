import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://genbalancer.online/api/v1/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export const HTTPR = axios.create({
  baseURL: "http://genbalancer.online",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});
