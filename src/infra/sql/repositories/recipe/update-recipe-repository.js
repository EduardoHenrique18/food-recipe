const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/recipe')
const ServerError = require('../../../../utils/errors/server-error')

const Recipe = UserModel(Db, sequelize.DataTypes)

module.exports = class UpdateRecipeRepository {
  async UpdateRecipe (recipe) {
    try {
      const { description, prepareMethod, recipeYield, product, recipeId } = recipe

      return Recipe.update({
        description,
        prepareMethod,
        recipeYield,
        product
      }, {
        where: { recipeId }
      })
    } catch (err) {
      throw new ServerError()
    }
  }
}
