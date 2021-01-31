'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  user.associate = function (models) {
    user.hasMany(models.recipe)
  }
  return user
}
