import { allowedOrigins } from "../config/cors-config.js";

// The Access-Control-Allow-Credentials response header tells browsers whether
// to expose the response to the frontend JavaScript code when the request's
// credentials mode (Request.credentials) is include.

function credentials(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
}

export default credentials;
