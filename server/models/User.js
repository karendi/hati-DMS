import Bcrypt from 'bcrypt-nodejs';
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
      unique: true,
      validate: {
        isEmail: true,
        msg: 'Must be a valid email address'
      }
    }
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
      type: Sequelize.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
        args: [6, 200],
        msg: 'Password should be atleast 6 characters long'
        }
      }
    },
    createdAt: {
      type: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: 'createdAt',
      allowNull: false
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
