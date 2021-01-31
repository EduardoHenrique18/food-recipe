'use strict'
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    recipeYield: DataTypes.STRING,
    prepareMethod: DataTypes.STRING,
    product: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})
  recipe.associate = function (models) {
    recipe.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
  }
  return recipe
}
