import faker from 'faker';

const legitUsers = [
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
    password: 'coffeeisbae',
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
  }
];

const invalidUsers = [
  {
    fName: faker.name.firstName,
    lName: faker.name.lastName,
    email: 'yule@example.com',
    username: faker.name.userName,
    password: 'incorrect',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fName: faker.name.firstName,
    lName: faker.name.lastName,
    email: faker.name.email,
    username: faker.name.userName,
    password: '',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fName: faker.name.firstName,
    lName: faker.name.lastName,
    email: faker.name.email,
    username: 'yulemsee',
    password: 'incorrect',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default {
  legitUsers,
  invalidUsers
};
