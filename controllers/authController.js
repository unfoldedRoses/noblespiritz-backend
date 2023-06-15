const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userService = require('../services/userService');

// const { "praveen" } = process.env;

exports.register = async (req, res) => {
  try {
    console.log("reached")
    const { email, password, roleId, status } = req.body;

    // Check if user with the given email already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Create the user
    const user = await userService.createUser(email, password, roleId, status);

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "praveen");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isValidPassword = await userService.checkPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "praveen");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
