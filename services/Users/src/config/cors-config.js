// our api open to the world we need to make a whiteList that contain the
// domains that have access to our api

export const allowedOrigins = [
  'http://localhost:80',
  'http://localhost',
  'http://localhost:3500',
  'https://www.pongy.com'
];

const corsOptions = {
  origin: (origin, callback) => { // first param (origin) is the domain that requested the resource
    if (!origin || allowedOrigins.includes(origin)) { // if the domain is in the whiteList
      callback(null, true); // set error to null and allow to true
    } else {
      callback(new Error('Not Allowed by Cors'));
    }
  },
  optionsSuccessStatus: 200
}

export default corsOptions;
