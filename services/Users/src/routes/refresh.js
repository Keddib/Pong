import { Router } from "express";
// import { __dirname } from '../config/dirname.js';
import { createRequire } from "module";
import jwt from "jsonwebtoken";
const require = createRequire(import.meta.url);



var data = {
  users: require('../data/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
}



function hundleRefreshToken(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  let foundUser = data.users.find((user) => (user.refreshToken === refreshToken));
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username != decoded.username) return res.sendStatus(403);
      let accessToken = jwt.sign(
        { "username": decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '120s' }
      );
      res.json({ accessToken });
    }
  )
}


const router = Router();

router.route('/')
  .get(hundleRefreshToken);

export default router;
