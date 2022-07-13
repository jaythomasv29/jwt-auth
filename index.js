const express = require("express");
const auth = require("./routes/auth");

const PORT = 4000;

const app = express();
app.use(express.json()); // allow for body paring in req.body

// auth routes
app.use("/auth", auth);

// root
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
