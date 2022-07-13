const express = require("express");
const auth = require("./routes/auth");
const posts = require("./routes/posts")

const PORT = 4000;

const app = express();
app.use(express.json()); // allow for body paring in req.body

// auth routes
app.use("/auth", auth);
app.use("/posts", posts);

// root
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
