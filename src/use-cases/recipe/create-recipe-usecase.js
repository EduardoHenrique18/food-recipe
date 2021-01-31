const InvalidParamError = require('../../utils/errors/invalid-param-error')
const HttpResponse = require('../../utils/http-response')

module.exports = class CreateRecipeUseCase {
  constructor (createRecipeRepository, readRecipeRepository, recipeValidator) {
    this.createRecipeRepository = createRecipeRepository
    this.recipeValidator = recipeValidator
    this.readRecipeRepository = readRecipeRepository
    this.httpResponse = HttpResponse
  }

  async CreateRecipe (recipeParam) {
    try {
      this.recipeValidator.Validate(recipeParam)

      const recipeAlreadyExist = await this.readRecipeRepository.ReadRecipeByRecipeDescription(recipeParam)
      if (recipeAlreadyExist) {
        return this.httpResponse.conflictError('Recipe Already Exist')
      }
      const createdRecipe = await this.createRecipeRepository.CreateRecipe(recipeParam)
      console.log(createdRecipe)
      return this.httpResponse.Ok(createdRecipe)
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
