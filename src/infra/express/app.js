const express = require('express')
const cors = require('cors')
const Routes = require('./Routes')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('../../../swagger.json')

const db = require('../../../config/db')

class App {
  constructor () {
    this.express = express()

    this.dataBase()
    this.middlewares()
    this.swagger()
    this.routes()
  }

  dataBase () {
    db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      })
  }

  swagger () {
    this.express.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }

  middlewares () {
    this.express.use(express.json({ limit: '50mb' }))
    this.express.use(cors())
  }

  routes () {
    this.express.use(Routes)
  }
}

module.exports = new App().express
