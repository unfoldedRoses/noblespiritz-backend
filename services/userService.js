const { User } = require('../models');
const { Role } = require('../models');
const bcrypt =require('bcrypt')

exports.getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

exports.createUser = async (username,email, password, role_id, status) => {
  return User.create({ username,email, password, role_id, status });
};

exports.checkPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.getRoleById = async (roleId) => {
  try {
    console.log(roleId,">>>")
    return await Role.findByPk(roleId);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve role by ID');
  }
};