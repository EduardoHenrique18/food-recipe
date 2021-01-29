const HttpResponse = require('../../utils/http-response')

module.exports = class ReadAllRecipeUseCase {
  constructor (readAllRecipeRepository) {
    this.readAllRecipeRepository = readAllRecipeRepository
    this.httpResponse = HttpResponse
  }

  async ReadAllRecipe (recipeParam) {
    try {
      const recipes = await this.readAllRecipeRepository.ReadAllRecipeByUserId(recipeParam)

      return this.httpResponse.Ok(recipes)
    } catch (error) {
      console.log(error)
      return this.httpResponse.ServerError()
    }
  }
}
