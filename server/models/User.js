const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        msg: 'Must be a valid email address'
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: 3,
            msg: "Username must be atleast 3 characters long"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
          args: 3
          }
        }
      }
    }
  }, {
    classMethods: {
      associate (models) => {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents'
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
      }
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password);
      },
      beforeUpdate(user) {
        user.password = bcrypt.hashSync(user.password);
      }
    }
  });
  return User;
};
