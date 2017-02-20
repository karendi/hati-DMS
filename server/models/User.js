import Bcrypt from 'bcryptjs';
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
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
          len: {
          args: [6, 200],
          msg: 'Password should be atleast 6 characters long'
          }
        },
        set: (value) => {
          hashedPassword = Bcrypt.hashSync(value, salt);
          this.setDataValue('password', value);
          this.setDataValue('salt', salt);
          this.setDataValue('password_hash', hashedPassword);
        },
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
        user.password = Bcrypt.hashSync(user.password);
      },
      beforeUpdate(user) {
        user.password = Bcrypt.hashSync(user.password);
      }
    }
  });
  return User;
};
