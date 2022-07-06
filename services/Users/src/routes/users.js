import fsPromises from "fs/promises";
import fs from "fs";
import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { __dirname } from '../config/dirname.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);



const router = Router();
const upload = multer({ dest: 'upload/' });



var data = {
  users: require('../data/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
}

router.route('/')

  .get((req, res) => {
    res.json(data.users);
  })

  .post((req, res) => {

    if (!req.body.name || !req.body.username) {
      res.status(400).json({ 'message': 'name and username are required!' })
      return;
    }
    const newUser = {
      id: data.users.at(-1)?.id + 1 || 1,
      name: req.body.name,
      username: req.body.username
    };
    data.setUsers([...data.users, newUser]);
    res.status(201).json(newUser);
  })

  .put((req, res) => {
    res.status(501).json({
      'error': '501 Not Implemented',
      'message': 'soon inchaallah'
    });
  })

  .delete((req, res) => {
    res.status(501).json({
      'error': '501 Not Implemented',
      'message': 'soon inchaallah'
    });
  })


router.route('/:id')
  .get((req, res) => {
    let usr = data.users.find((usr) => (usr.id == parseInt(req.params.id)));
    if (!usr) {
      res.status(404).json({ 'message': 'user not found' });
      return;
    }
    res.json(usr);
  })
  .put(upload.single('userImage'), async (req, res) => {

    // check if user update his data
    if (req.user === req.params.id) {
      let user = data.users.find((usr) => (usr.username === req.params.id));
      if (!user) {
        return res.sendStatus(404);
      }

      let nickName = req.body?.nickName;

      var fs = require('fs');
      fs.rename(req?.file?.path, req?.file?.path + '.jpg', function (err) {
        if (err) console.log('ERROR: ' + err);
      });

      let imgPath = req?.file?.path;
      if (imgPath) {
        imgPath = imgPath ? "http:localhost:3500/" + imgPath + '.jpg' : user.image_url;
      }
      const updatedUser = { ...user, nickName, image_url: imgPath };
      user.nickName = updatedUser.nickName;
      user.image_url = updatedUser.image_url;
      // await fsPromises.writeFile(
      //   path.join(__dirname, "..", "data", "users.json"),
      //   JSON.stringify(data.users)
      // );
      delete updatedUser.refreshToken;
      function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      await sleep(5000);
      res.status(201).json(updatedUser);

    }
    else {
      // chi waled l9ahba kaykhawar hena
      return res.sendStatus(403);
    }
  })


export default router;
