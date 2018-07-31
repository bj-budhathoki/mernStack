const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../model/Post");
const Profile = require("../../model/Profile");
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
 * @route GET api/posts
 * @Desc get posts
 * @accesss public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopost: "No post found" }));
});
/**
 * @route GET api/posts/:id
 * @Desc get posts by id
 * @accesss public
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopost: "No post found for this id" })
    );
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
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

/**
 * @route DELETE api/posts/:id
 * @Desc delete posts by id
 * @accesss Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthoeized: "User not authorized" });
        }
        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(404).json({ postnotfound: "post not found" })
          );
      });
    });
  }
);

/**
 * @route Post api/like/:id
 * @Desc unlike post
 * @accesss Private
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.status(400).json({ notLiked: "not liked this post" });
        }
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      });
    });
  }
);

/**
 * @route Post api/like/:id
 * @Desc unlike post
 * @accesss Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ aleadyLiked: "User already liked this post" });
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      });
    });
  }
);
module.exports = router;
