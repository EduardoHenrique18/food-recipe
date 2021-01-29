const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/recipe')
const ServerError = require('../../../../utils/errors/server-error')

const Recipe = UserModel(Db, sequelize.DataTypes)

module.exports = class DeleteRecipeRepository {
  async DeleteRecipe (recipeId, userId) {
    try {
      return await Recipe.destroy({
        where: { recipeId, userId }
      })
    } catch (err) {
      console.log(err)
      throw new ServerError()
    }
  }
}
