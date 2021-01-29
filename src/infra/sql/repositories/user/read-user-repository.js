const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/user')
const ServerError = require('../../../../utils/errors/server-error')

const User = UserModel(Db, sequelize.DataTypes)

module.exports = class ReadUserRepository {
  async ReadUserByEmail (userParam) {
    try {
      const { email } = userParam
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      return user
    } catch (err) {
      console.log(err)
      throw new ServerError()
    }
  }
}
