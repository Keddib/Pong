import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHundler from './middleware/error-hundler.js'
import auth from './routes/auth.js';
import refresh from './routes/refresh.js';
import logout from './routes/logout.js';
import users from './routes/users.js';
import { logger } from './middleware/event-logger.js';
import corsOptions from './config/cors-config.js'
import verifyJWT from "./middleware/verify-jwt.js";
import credentials from "./middleware/credentails.js"

dotenv.config();
const App = express();
const PORT = process.env.PORT || 3500;

// custom middleware logger
App.use(logger);

// credentials middleware
App.use(credentials);


// Cross-origin resource sharing

App.use(cors(corsOptions));

// midlleware for json data
App.use(express.json({ limit: '50mb' }));
App.use(express.urlencoded({ limit: '50mb', extended: true }));

// middleware for cookies

App.use(cookieParser());

// public routes

App.use('/upload', express.static('./upload'));

// auth routes
App.use('/auth', auth);
App.use('/auth/refresh', refresh);
App.use('/auth/logout', logout);

// users route

App.use(verifyJWT);
App.use('/users', users);

App.all('*', (req, res) => {
  res.status(404);
  res.json({
    error: '404 not found'
  })
})

App.use(errorHundler);

App.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
