const Sequelize = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const Role = require('./role')(sequelize, Sequelize);
const User = require('./user')(sequelize, Sequelize);

User.belongsTo(Role);
Role.hasMany(User);

module.exports = { sequelize, Role, User };
