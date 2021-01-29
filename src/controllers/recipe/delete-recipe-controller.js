const DeleteRecipeUseCase = require('../../use-cases/recipe/delete-recipe-usecase')
const DeleteRecipeRepository = require('../../infra/sql/repositories/recipe/delete-recipe-repository')

module.exports = class DeleteRecipeController {
  constructor () {
    this.deleteRecipeRepository = new DeleteRecipeRepository()
    this.deleteRecipeUseCase = new DeleteRecipeUseCase(this.deleteRecipeRepository)
  }

  async DeleteRecipe (request, response) {
    console.log(request.params)
    const returnMessage = await this.deleteRecipeUseCase.DeleteRecipe(request.params, request.body.userId)
    response.status(returnMessage.statusCode).send(returnMessage)
  }
}
