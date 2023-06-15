module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };
  