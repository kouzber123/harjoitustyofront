import axios from "axios";

//delay for the screen by adding some sleep

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};
//this handles axios requests set the baseurl :
axios.defaults.baseURL = "http://localhost:5000/Polls";

//intercept the req and cause small 1s delay then return the resp
axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

//resp body will have the data
const responseBody = response => response.data;

//below handles the requests user makes
const requests = {
  get: url => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody)
};

//endpoints
const Polls = {
  list: () => requests.get("/"),
  details: id => requests.get(`/${id}`),
  create: poll => requests.post("/add/", poll),
  update: poll => requests.put("/id/vote/option/", poll)
};
const agent = {
  Polls
};

export default agent;
