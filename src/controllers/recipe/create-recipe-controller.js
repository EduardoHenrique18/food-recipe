const CreateRecipeUseCase = require('../../use-cases/recipe/create-recipe-usecase')
const CreateRecipeRepository = require('../../infra/sql/repositories/recipe/create-recipe-repository')
const ReadRecipeRepository = require('../../infra/sql/repositories/recipe/read-recipe-repository')
const RecipeValidator = require('../../utils/validators/recipe-validator')

module.exports = class CreateRecipeController {
  constructor () {
    this.createRecipeRepository = new CreateRecipeRepository()
    this.readRecipeRepository = new ReadRecipeRepository()
    this.recipeValidator = new RecipeValidator()
    this.createRecipeUseCase = new CreateRecipeUseCase(this.createRecipeRepository, this.readRecipeRepository, this.recipeValidator)
  }

  async CreateRecipe (request, response) {
    const returnMessage = await this.createRecipeUseCase.CreateRecipe(request.body)
    response.status(returnMessage.statusCode).send(returnMessage)
  }
}
