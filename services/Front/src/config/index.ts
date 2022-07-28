// get all end points needed from envirement variables
import { MediaQuery } from "types/config";

const api = {
  auth42: "https://api.intra.42.fr/oauth/authorize?client_id=a57b6c08b2acdbe87240256738b7e23fc9e049afd718f6730f5d2642c246d1c3&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth42&response_type=code",//process.env.AUTH42REDIRECT,
  users: "http://localhost:3500", //process.env.USERS,
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
