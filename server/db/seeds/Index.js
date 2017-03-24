const role = require('./RoleSeed');
const user = require('./UserSeed');
const doc = require('./DocumentSeed');

module.exports = {
  legitRoles: role.legitRoles,
  invalidRoles: role.invalidRoles,

  legitUsers: user.legitUsers,
  invalidUsers: user.invalidUsers,

  legitDocs: doc.legitDocs,
  invalidDocs: doc.invalidDocs
};
