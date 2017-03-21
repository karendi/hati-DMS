module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      validate: {
        isIn: [['public', 'private', 'role']]
      },
      allowNull: false
    },
    userRoleId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};
