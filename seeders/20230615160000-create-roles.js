'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rolesData = [
      { name: 'admin' },
      { name: 'trainer' },
      { name: 'candidate' }
    ];

    const roles = await queryInterface.bulkInsert('Roles', rolesData, { returning: true });

    const usersData = [
      {
        email: 'admin@example.com',
        password: 'password',
        roleId: roles.find(role => role.name === 'admin').id,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'trainer@example.com',
        password: 'password',
        roleId: roles.find(role => role.name === 'trainer').id,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'candidate@example.com',
        password: 'password',
        roleId: roles.find(role => role.name === 'candidate').id,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', usersData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
