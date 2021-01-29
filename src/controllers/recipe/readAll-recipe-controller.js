const ReadAllRecipeUseCase = require('../../use-cases/recipe/readAll-recipe-usecase')
const ReadAllRecipeRepository = require('../../infra/sql/repositories/recipe/read-recipe-repository')

module.exports = class ReadAllRecipeController {
  constructor () {
    this.readAllRecipeRepository = new ReadAllRecipeRepository()
    this.readAllRecipeUseCase = new ReadAllRecipeUseCase(this.readAllRecipeRepository)
  }

  async ReadAllRecipe (request, response) {
    const returnMessage = await this.readAllRecipeUseCase.ReadAllRecipe(request.body)
    response.status(returnMessage.statusCode).send(returnMessage)
  }
}
