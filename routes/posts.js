const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db");
const checkAuth = require("../middleware/checkAuth");

// public posts
router.get("/public", (req, res) => {
  res.json(publicPosts);
});

router.get("/private", checkAuth, (req, res) => {
  return res.json(privatePosts);
});

module.exports = router;
