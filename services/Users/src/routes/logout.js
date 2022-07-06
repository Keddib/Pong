import { Router } from "express";
import fsPromises from "fs/promises";
import path from 'path';
import { __dirname } from '../config/dirname.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var data = {
  users: require('../data/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
}

async function hundleLogout(req, res) {
  // on client also delete accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  let foundUser = data.users.find((user) => (user.refreshToken === refreshToken));
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
    });

    return res.sendStatus(204);
  }

  // delete the refresh token
  const otherUsers = data.users.filter(usr => (usr.refreshToken !== foundUser.refreshToken));
  const currentUser = { ...foundUser, refreshToken: '' };
  data.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', 'data', 'users.json'),
    JSON.stringify(data.users)
  );

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
  });

  res.sendStatus(204);

}

const router = Router();
router.route('/')
  .get(hundleLogout);

export default router;
