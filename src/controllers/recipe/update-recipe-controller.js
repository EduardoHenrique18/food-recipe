const UpdateRecipeUseCase = require('../../use-cases/recipe/update-recipe-usecase')
const UpdateRecipeRepository = require('../../infra/sql/repositories/recipe/update-recipe-repository')
const ReadRecipeRepository = require('../../infra/sql/repositories/recipe/read-recipe-repository')
const RecipeValidator = require('../../utils/validators/recipe-validator')

module.exports = class UpdateRecipeController {
  constructor () {
    this.updateRecipeRepository = new UpdateRecipeRepository()
    this.readRecipeRepository = new ReadRecipeRepository()
    this.recipeValidator = new RecipeValidator()
    this.updateRecipeUseCase = new UpdateRecipeUseCase(this.updateRecipeRepository, this.recipeValidator)
  }

  async UpdateRecipe (request, response) {
    const returnMessage = await this.updateRecipeUseCase.UpdateRecipe(request.body)
    response.status(returnMessage.statusCode).send(returnMessage)
  }
}
