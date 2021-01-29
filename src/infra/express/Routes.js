const { Router } = require('express')
const CreateUserController = require('../../controllers/User/create-user-controller')
const CreateRecipeController = require('../../controllers/recipe/create-recipe-controller')
const UpdateRecipeController = require('../../controllers/recipe/update-recipe-controller')
const ReadAllRecipeController = require('../../controllers/recipe/readAll-recipe-controller')
const DeleteRecipeController = require('../../controllers/recipe/delete-recipe-controller')
const LoginController = require('../../controllers/user/Login-controller')
const auth = require('../../utils/auth/auth')
const routes = Router()

routes.route('/user')
  .post((request, response) => {
    new CreateUserController().CreateUser(request, response)
  })

routes.route('/login')
  .post((request, response) => {
    new LoginController().Login(request, response)
  })

routes.route('/recipe')
  .post(auth, (request, response) => {
    new CreateRecipeController().CreateRecipe(request, response)
  })
  .put(auth, (request, response) => {
    new UpdateRecipeController().UpdateRecipe(request, response)
  })
  .get(auth, (request, response) => {
    new ReadAllRecipeController().ReadAllRecipe(request, response)
  })

routes.route('/recipe/:recipeId')
  .delete(auth, (request, response) => {
    new DeleteRecipeController().DeleteRecipe(request, response)
  })

module.exports = routes
