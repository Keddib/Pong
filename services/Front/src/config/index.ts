// get all end points needed from envirement variables
import dotenv from "dotenv";
import { MediaQuery } from "types/config";

dotenv.config();

const api = {
  auth42:
    "https://api.intra.42.fr/oauth/authorize?client_id=dac506e7095f7f042e1e9de45db80a9706974bbc636c35a367dd88b2bfdcebbb&redirect_uri=http%3A%2F%2Flocalhost%2Fauth42%2F&response_type=code",
  users: process.env.USERS || "localhost:3500",
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
