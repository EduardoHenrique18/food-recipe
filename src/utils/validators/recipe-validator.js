const InvalidParamError = require('../errors/invalid-param-error')
const Validate = require('validator')

module.exports = class RecipeValidator {
  Validate (recipe) {
    const { description, preparationMethod, recipeYield, ingredient, userId } = recipe
    console.log(recipe)
    if (
      Validate.isEmpty(description) ||
      !Validate.matches(description, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(description, { min: 5, max: 50 })) {
      throw new InvalidParamError('name')
    } else if (
      Validate.isEmpty(preparationMethod) ||
      !Validate.matches(preparationMethod, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(preparationMethod, { min: 5, max: 50 })) {
      throw new InvalidParamError('preparationMethod')
    } else if (
      Validate.isEmpty(recipeYield) ||
      !Validate.matches(recipeYield, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(recipeYield, { min: 5, max: 50 })) {
      throw new InvalidParamError('recipeYield')
    } else if (
      Validate.isEmpty(ingredient) ||
      !Validate.matches(ingredient, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(ingredient, { min: 5, max: 50 })) {
      throw new InvalidParamError('ingredient')
    } else if (
      Validate.isEmpty(userId.toString()) ||
      !Validate.isNumeric(userId.toString())) {
      throw new InvalidParamError('userId')
    }
  }
}
