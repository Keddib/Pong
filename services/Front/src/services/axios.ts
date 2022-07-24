import axios from "axios";

const URL = "http://localhost:3500"; // uusers end point

const axiosUsers = axios.create({
  baseURL: URL,
});

export const axiosImage = axios.create({
  baseURL: "http://localhost:3500/upload/d0c2f198012d0e25049a49eec79ad3db.jpg",
});

export { axiosUsers };
