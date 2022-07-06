import { Router } from "express";
import fsPromises from "fs/promises";
import path from 'path';
import { __dirname } from '../config/dirname.js';
import { createRequire } from "module";
import { getAccessToken, getUserData } from "../services/authentication.js";
import jwt from "jsonwebtoken";
const require = createRequire(import.meta.url);

const router = Router();


var data = {
  users: require('../data/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
}

function getJWTtokens(username) {
  const accessToken = jwt.sign(
    { "username": username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '2h' }
  );
  const refreshToken = jwt.sign(
    { "username": username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return [accessToken, refreshToken];
}


async function addUserToData(user, token) {
  let isAdded = false;
  const exist = data.users.find((usr) => {
    return usr.id == user.id;
  });

  if (exist) {
    exist.refreshToken = token;
  } else {
    user.refreshToken = token;
    data.setUsers([...data.users, user]);
    isAdded = true;
  }
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(data.users)
  );
  // return false if already excist or true if added
  return [isAdded, exist];
}



router.route('/')
  .get((req, res) => {
    res.json({
      messaage: 'welcome to authentication api'
    })
  })

  .post(async (req, res) => {
    // get code from query string
    let code = req.query?.code;
    // if not return 400
    if (!code) {
      res.status(400).json({ 'Bad Request': 'code is required' });
      return;
    }

    try {
      const aToken = await getAccessToken(code);
      const newUser = await getUserData(aToken);
      // if user already exict return user data with 200 OK status
      // otherwise add user return  user data with 201 created status
      // check if user already exict
      const [accessToken, refreshToken] = getJWTtokens(newUser.username);

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      let unwrap = ({ id, username, email, image_url }) => ({ id, username, email, image_url });
      let resUser = unwrap(newUser);

      let [added, exict] = await addUserToData(newUser, refreshToken);
      console.log('isAdded = ', added);
      if (added) {
        return res.status(201).json({ ...resUser, accessToken });
      }
      res.json({ ...exict, accessToken, refreshToken: '' });

    } catch (e) {
      if (e.response) {
        res.status(e.response.status).json(e.response.data);
        return;
      }
      if (!e.message) {
        e.message = 'server enterrnal error';
      }
      res.status(500).json({ message: e.messaage });
    }
  })

export default router;
