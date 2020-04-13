const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });

      // If exists return 400
      if (user) return res.status(400).json("User already exists");

      // Otherwise generate a new user
      user = new User({ name, email, password });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save to the database
      await user.save();

      // Create the payload (the oobject I want to send in the token)
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the payload with JWT and return it
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 60 * 60 * 100 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json("Server error");
    }
  }
);

module.exports = router;
