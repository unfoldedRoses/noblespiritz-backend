const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Role } = require('../models');
const userService = require('../services/userService');



// exports.register = async (req, res) => {
//   try {
    
//     const { username,email, password, role, status } = req.body;

//     // Check if user with the given email already exists
//     const existingUser = await userService.getUserByEmail(email);
//     if (existingUser) {
//       return res.status(409).json({ error: 'User with this email already exists' });
//     }
    
//     // Create the user
//     const user = await userService.createUser(username,email, password, role, status);
   
//     // Generate JWT token
//     const token = jwt.sign({ id: user.id }, "praveen");

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



exports.register = async (req, res) => {
  try {
    const { username, email, password, role, status } = req.body;

    // Check if user with the given email already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Get the role_id based on the role name
    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

  

    // Create the user
    const user = await userService.createUser(username, email, password, roleRecord.name, status);

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "praveen");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createUser = async (username, email, password, role, status) => {
  return User.create({ username, email, password, role, status });
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
    const token = jwt.sign({ id: user.id }, "praveen" , {expiresIn: "1d"});


  // Get the user's role
  const role = await Role.findOne({ where: { name: user.role } });
  
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });

    res.json({ accessToken:token,role:role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
