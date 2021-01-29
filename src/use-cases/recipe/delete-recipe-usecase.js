const HttpResponse = require('../../utils/http-response')

module.exports = class DeleteRecipeUseCase {
  constructor (deleteRecipeRepository) {
    this.deleteRecipeRepository = deleteRecipeRepository
    this.httpResponse = HttpResponse
  }

  async DeleteRecipe (recipeParam, userId) {
    try {
      const deleteRecipe = await this.deleteRecipeRepository.DeleteRecipe(recipeParam.recipeId, userId)
      console.log(deleteRecipe)
      return this.httpResponse.Ok(deleteRecipe)
    } catch (error) {
      console.log(error)
      return this.httpResponse.ServerError()
    }
  }
}
