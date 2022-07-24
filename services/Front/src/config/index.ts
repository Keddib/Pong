// get all end points needed from envirement variables
import dotenv from "dotenv";
import { MediaQuery } from "types/config";

dotenv.config();

const api = {
  auth42: process.env.AUTH42REDIRECT,
  users: process.env.USERS
};

interface MediaQueries {
  sm: MediaQuery;
  md: MediaQuery;
  lg: MediaQuery;
  xl: MediaQuery;
  xl2: MediaQuery;
}

const mediaQueries: MediaQueries = {
  sm: "(min-width: 500px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xl2: "(min-width: 1536px)",
};

export { api, mediaQueries };
