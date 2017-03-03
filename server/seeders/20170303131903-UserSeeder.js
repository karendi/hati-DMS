module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [
      {
        fName: 'Admin',
        lName: 'Mwenyewe',
        email: 'admin@example.com',
        username: 'admin',
        password: '123456',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Jane',
        lName: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        password: 'iwillnotrememberthis',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'John',
        lName: 'Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'whymewhy',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Dylan',
        lName: 'Muchemi',
        email: 'dylan@example.com',
        username: 'dmuchemi',
        password: 'coffeeisfuel',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Yule',
        lName: 'Msee',
        email: 'yule@example.com',
        username: 'yulemsee',
        password: 'incorrect',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
