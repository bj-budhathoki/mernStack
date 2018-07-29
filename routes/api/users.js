const express = require("express");
const router = express.Router();
const passport = require('passport')
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const keys = require('../../config/key')
//user model
const User = require("../../model/User");
/**
 * @route GET api/users/test
 * @Desc Test users route
 * @accesss public
 */
router.get("/test", (req, res) => res.json({ msg: "User works" }));
/**
 * @route GET api/users/register
 * @Desc Register user
 * @accesss public
 */
router.post("/register", (req, res) => {
  User.findOne({ emial: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "this email aleady exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200,
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route GET api/users/login
 * @Desc login user
 * @accesss public
 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //find the user
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: "User not found"
      });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }//create JWT payload
        //Sing Token
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 },
          (err, token) => {
            res.send({
              success: true,
              token: 'Bearer ' + token
            })
          })
      } else {
        return res.status(400).json({ password: "incerroct password" });
      }
    });
  });
});

/**
 * @route GET api/users/current
 * @Desc return current user
 * @accesss Private
 */
router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ msg: 'success' })
  })
module.exports = router;
