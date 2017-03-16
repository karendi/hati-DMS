import * as role from './RoleSeed';
import * as user from './UserSeed';
import * as doc from './DocumentSeed';

export default {
  legitRoles: role.legitRoles,
  invalidRoles: role.invalidRoles,

  legitUsers: user.legitUsers,
  invalidUsers: user.invalidUsers,

  legitDocs: doc.legitDocs,
  invalidDocs: doc.invalidDocs
};
