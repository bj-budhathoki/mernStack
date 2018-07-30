const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../model/Post");
const validatePostInput = require("../../validation/post");
/**
 * @route GET api/posts/test
 * @Desc Test post route
 * @accesss public
 */
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});
/**
 * @route GET api/posts/
 * @Desc create post
 * @accesss private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
module.exports = router;
