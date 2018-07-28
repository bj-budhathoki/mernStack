const express = require("express");
const router = express.Router();

/**
 * @route GET api/posts/test
 * @Desc Test post route
 * @accesss public
 */
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});
module.exports = router;
