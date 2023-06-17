const { User } = require('../models');
const { Role } = require('../models');
const bcrypt =require('bcrypt')

exports.getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

exports.createUser = async (username,email, password, role, status) => {
  
  return User.create({ username,email, password, role, status });
};

exports.checkPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// exports.getRoleById = async (roleId) => {
//   try {
//     console.log(roleId,">>>")
//     return await Role.findByPk(roleId);
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to retrieve role by ID');
//   }
// };




exports.getRole = async (criteria) => {
  try {
    const role = await Role.findOne(criteria);
    return role;
  } catch (error) {
    // Handle any errors that occur during role retrieval
    throw new Error('Failed to retrieve role');
  }
};