const InvalidParamError = require('../errors/invalid-param-error')
const Validate = require('validator')

module.exports = class RecipeValidator {
  Validate (recipe) {
    const { description, prepareMethod, recipeYield, product, userId } = recipe
    console.log(recipe)
    console.log(description + prepareMethod + recipeYield + product + userId)
    if (
      Validate.isEmpty(description) ||
      !Validate.matches(description, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(description, { min: 5, max: 50 })) {
      throw new InvalidParamError('name')
    } else if (
      Validate.isEmpty(prepareMethod) ||
      !Validate.matches(prepareMethod, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(prepareMethod, { min: 5, max: 50 })) {
      throw new InvalidParamError('prepareMethod')
    } else if (
      Validate.isEmpty(recipeYield) ||
      !Validate.matches(recipeYield, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(recipeYield, { min: 5, max: 50 })) {
      throw new InvalidParamError('recipeYield')
    } else if (
      Validate.isEmpty(product) ||
      !Validate.matches(product, /^[A-Za-z0-9\s]+[A-Za-z0-9\s]+$(\.0-9+)?/g) ||
      !Validate.isByteLength(product, { min: 5, max: 50 })) {
      throw new InvalidParamError('product')
    } else if (
      Validate.isEmpty(userId.toString()) ||
      !Validate.isNumeric(userId.toString())) {
      throw new InvalidParamError('userId')
    }
  }
}
