const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
/**
 * @route GET api/profile/test
 * @Desc Test profile route
 * @accesss public
 */
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

/**
 * @route GET api/profile
 * @Desc get current user profile
 * @accesss privete
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(400).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
