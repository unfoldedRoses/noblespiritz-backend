require('dotenv').config(); //
const Sequelize = require('sequelize');

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;


const sequelize = new Sequelize("noblespirit", "postgres", "123456", {
  host: "localhost",
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const Role = require('./role')(sequelize, Sequelize);
const User = require('./user')(sequelize, Sequelize);



module.exports = { sequelize, Role, User };
