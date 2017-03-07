module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [
      {
        id: 1,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
