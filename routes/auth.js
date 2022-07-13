// auth router
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const users = require("../db");
const JWT = require("jsonwebtoken");

router.get("/users", (req, res) => {
  res.json({ users: users });
});
// POST /auth/signup
router.post(
  "/signup",
  body("email", "Please provide a valid email").isEmail(),
  body("password", "Password must be greater than 5 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const { password, email } = req.body;
    const errors = validationResult(req);
    // Validation of input field
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Validation of email already exists in database
    let user = users.find((user) => user.email === email);
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "User already exists in datbase",
          },
        ],
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Add to db
    users.push({
      email,
      password: hashedPassword,
    });
    // Create JWT
    const token = await JWT.sign(
      {
        email,
      },
      "secret123",
      {
        expiresIn: "14d",
      }
    );
    // Send back to client
    res.json({ token });
  }
);

router.post("/login", 
  async (req, res) => {
  const { password, email } = req.body
  // Check if user exists in db
  let user = users.find(user => user.email === email)
  if(!user)  return res.status(400).json({
    errors: [
      {
        msg: "Invalid Credentials",
      },
    ],
  });
  // Decrypt & Compare password with hashed password
  let isPasswordMatch = await bcrypt.compare(password, user.password)
  if(!isPasswordMatch) return res.status(400).json({
    errors: [
      {
        msg: "Invalid Credentials",
      },
    ],
  });

  // Successful Validationn
  const token = await JWT.sign(
    {
      email,
    },
    "secret123",
    {
      expiresIn: "14d",
    }
  );
  // Send back to client
  res.json({ token });
})

module.exports = router;
