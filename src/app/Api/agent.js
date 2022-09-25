import axios from "axios";
import { useEffect } from "react";

//delay for the screen by adding some sleep

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};
//this handles axios requests
axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = response => response.data;

const requests = {
  get: url => axios.get(url).then(responseBody),
  post: (url, body = {}) => axios.post(url, body).then(responseBody),
  put: (url, body = {}) => axios.put(url, body).then(responseBody)
};

const Polls = {
  list: () => requests.get("/Epolls"),
  details: id => requests.get(`/Epoll/${id}`),
  create: poll => requests.post("/Epolls", poll),
  update: poll => requests.put(`/Epolls`, poll)
};
const agent = {
  Polls
};

export default agent;
