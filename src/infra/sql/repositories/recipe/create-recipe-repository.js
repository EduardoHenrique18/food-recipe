const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/recipe')
const ServerError = require('../../../../utils/errors/server-error')

const Recipe = UserModel(Db, sequelize.DataTypes)

module.exports = class CreateRecipeRepository {
  CreateRecipe (recipe) {
    try {
      const { description, prepareMethod, recipeYield, product, userId } = recipe

      return Recipe.create({
        description,
        prepareMethod,
        recipeYield,
        product,
        userId
      })
    } catch (err) {
      console.log(err)
      throw new ServerError()
    }
  }
}
