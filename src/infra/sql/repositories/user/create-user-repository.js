const sequelize = require('Sequelize')
const Db = require('../../../../../config/db')
const UserModel = require('../../../../../models/user')
const ServerError = require('../../../../utils/errors/server-error')

const User = UserModel(Db, sequelize.DataTypes)

module.exports = class CreateUserRepository {
  CreateUser (user) {
    try {
      const { userName, password, email } = user

      return User.create({
        name: userName,
        password,
        email
      })
    } catch (err) {
      throw new ServerError()
    }
  }
}
