# Authentication / Authorization with JWT

### User Sign Up
1. User Provides an Email & Password
  * Create route `/auth/signup`
  * Retrieve data from a POST request
  * Get data from req.body using Express / body parser

2. Validate Email & Passsword
  * Express validator
  * Utilize express-validator middleware validator functions
  * `body(<input name attr>).isEmail() and validationResult(req)` middleware function

3. Validate if User with that email does not already exist
  * Simply check if the user email credentials already exists in the database.
4. Hash the password
  * Bcrypt:
5. Save User to DB
6. Send a JWT (JSON Web Token)
  * Install jwt by doing `npm install jsonwebtoken`
  Parts of JSON Web Token:
    1. Header 
    2. Payload - (contains information about the user - * must not contain sensitive data * )
    3. Secret
  * Provide User with a JWT using `jwt.sign()`
---
### User Login
1. Validate User Credentials from `/login` route
2. Decrypt password and compare

