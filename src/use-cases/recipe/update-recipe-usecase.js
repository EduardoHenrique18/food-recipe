const InvalidParamError = require('../../utils/errors/invalid-param-error')
const HttpResponse = require('../../utils/http-response')

module.exports = class UpdateRecipeUseCase {
  constructor (updateRecipeRepository, recipeValidator) {
    this.updateRecipeRepository = updateRecipeRepository
    this.recipeValidator = recipeValidator
    this.httpResponse = HttpResponse
  }

  async UpdateRecipe (recipeParam) {
    try {
      console.log(recipeParam)
      this.recipeValidator.Validate(recipeParam)

      await this.updateRecipeRepository.UpdateRecipe(recipeParam)

      return this.httpResponse.Ok(recipeParam)
    } catch (error) {
      if (error instanceof InvalidParamError) {
        console.log(error)
        return this.httpResponse.InvalidParamError(error.message)
      } else {
        console.log(error)
        return this.httpResponse.ServerError()
      }
    }
  }
}
