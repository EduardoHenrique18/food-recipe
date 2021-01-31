const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/recipe')
const ServerError = require('../../../../utils/errors/server-error')

const Recipe = UserModel(Db, sequelize.DataTypes)

module.exports = class ReadRecipeRepository {
  async ReadAllRecipeByUserId (recipe) {
    try {
      const { userId } = recipe

      const read = await Recipe.findAll({
        where: {
          userId
        }
      })
      return read
    } catch (err) {
      throw new ServerError()
    }
  }

  async ReadRecipeByUserId (recipe) {
    try {
      const { userId } = recipe

      const read = await Recipe.findOne({
        where: {
          userId
        }
      })
      return read
    } catch (err) {
      throw new ServerError()
    }
  }

  async ReadRecipeByRecipeDescription (recipe) {
    try {
      const { description } = recipe

      const read = await Recipe.findOne({
        where: {
          description
        }
      })
      return read
    } catch (err) {
      throw new ServerError()
    }
  }
}
