'use strict'
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: DataTypes.STRING,
    recipeYield: DataTypes.STRING,
    preparationMode: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})
  recipe.associate = function (models) {
    recipe.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
  }
  return recipe
}
