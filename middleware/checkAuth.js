const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Check if token is present
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token)
    return res.status(400).json({
      errors: [
        {
          msg: "No Token Found",
        },
      ],
    });
  // Verify JWT user
  try {
    let user = await JWT.verify(token, "secret123");
    console.log(user);
    next();
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: "Invalid Token",
        },
      ],
    });
  }

  // let userValid = false;
  // // check to see if user is authorized using JWT
  // if (userValid) {
  //   // call next() if user is valid
  // } else {
  //   // else we can send an error
  //   return res.status(400).json({
  //     errors: [
  //       {
  //         msg: "Access Denied",
  //       },
  //     ],
  //   });
  // }
};
