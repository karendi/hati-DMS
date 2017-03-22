const Bcrypt = require('bcrypt-nodejs');
const salt = Bcrypt.genSaltSync(10);

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
      unique: true
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
        args: [6, 200],
        msg: 'Password should be atleast 6 characters long'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Document, { foreignKey: 'userId' });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      generateHashedPassword() {
        this.password = Bcrypt.hashSync(this.password, salt);
      },
      validatePassword(password) {
        return Bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.generateHashedPassword();
      },
      beforeUpdate(user) {
        user.generateHashedPassword();
      }
    }
  });
  return User;
};
