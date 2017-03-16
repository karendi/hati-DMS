const Bcrypt = require('bcrypt-nodejs');
const salt = Bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fName: 'Admin',
        lName: 'Mwenyewe',
        email: 'admin@example.com',
        username: 'admin',
        password: Bcrypt.hashSync('123456', salt),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Jane',
        lName: 'Doe',
        email: 'jane@example.com',
        username: 'janedoe',
        password: Bcrypt.hashSync('iwillnotrememberthis', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'John',
        lName: 'Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: Bcrypt.hashSync('whymewhy', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Dylan',
        lName: 'Muchemi',
        email: 'dylan@example.com',
        username: 'dmuchemi',
        password: Bcrypt.hashSync('coffeeisbae', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fName: 'Yule',
        lName: 'Msee',
        email: 'yule@example.com',
        username: 'yulemsee',
        password: Bcrypt.hashSync('incorrect', salt),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
