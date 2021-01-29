const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/recipe')
const ServerError = require('../../../../utils/errors/server-error')

const Recipe = UserModel(Db, sequelize.DataTypes)

module.exports = class UpdateRecipeRepository {
  async UpdateRecipe (recipe) {
    try {
      const { description, preparationMethod, recipeYield, ingredient, recipeId } = recipe

      return Recipe.update({
        description,
        preparationMethod,
        recipeYield,
        ingredient
      }, {
        where: { recipeId }
      })
    } catch (err) {
      throw new ServerError()
    }
  }
}
