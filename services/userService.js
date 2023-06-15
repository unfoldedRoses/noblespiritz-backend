const { User } = require('../models');
const bcrypt =require('bcrypt')

exports.getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

exports.createUser = async (email, password, roleId, status) => {
  return User.create({ email, password, roleId, status });
};

exports.checkPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
