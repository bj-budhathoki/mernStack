const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
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
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "incerroct password" });
      }
    });
  });
});
module.exports = router;
