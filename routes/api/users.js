const express = require("express");
const router = express.Router();

/**
 * @route GET api/users/test
 * @Desc Test users route
 * @accesss public
 */
router.get("/test", (req, res) => res.json({ msg: "User works" }));
module.exports = router;
