const legitRoles = [
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
];

const invalidRoles = [
  {
    id: 2,
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default {
  legitRoles,
  invalidRoles
};
