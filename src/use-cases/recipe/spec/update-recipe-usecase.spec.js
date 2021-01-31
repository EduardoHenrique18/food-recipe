const UpdateRecipeUseCase = require('../update-recipe-usecase')
const { InvalidParamError } = require('../../../utils/errors')
const HttpResponse = require('../../../utils/http-response')

const makeSut = () => {
  const recipeValidatorSpy = makeRecipeValidator()
  const updateRecipeRepositorySpy = makeUpdateRecipeRepositorySpy()
  const sut = new UpdateRecipeUseCase(
    updateRecipeRepositorySpy,
    recipeValidatorSpy
  )
  return {
    sut,
    updateRecipeRepositorySpy,
    recipeValidatorSpy
  }
}

const makeRecipeValidator = () => {
  class RecipeValidatorSpy {
    Validate (Recipe) {
      this.recipe = Recipe
      if (this.recipe.description.length < 5) {
        throw new InvalidParamError('teste2e')
      }
    }
  }
  const recipeValidatorSpy = new RecipeValidatorSpy()
  return recipeValidatorSpy
}

const makeRecipeValidatorWithError = () => {
  class RecipeValidatorSpy {
    updateRecipeValidatorSpy () {
      throw new Error()
    }
  }
  return new RecipeValidatorSpy()
}

const makeUpdateRecipeRepositorySpy = () => {
  class UpdateRecipeByEmailRepositorySpy {
    async UpdateRecipe (Recipe) {
      this.recipe = Recipe
      this.recipe.recipeId = '1'
      return this.recipe
    }
  }
  const updateRecipeByEmailRepositorySpy = new UpdateRecipeByEmailRepositorySpy()
  return updateRecipeByEmailRepositorySpy
}

const makeUpdateRecipeRepositorySpyWithError = () => {
  class UpdateRecipeByEmailRepositorySpy {
    async UpdateRecipe () {
      throw new Error()
    }
  }
  const updateRecipeByEmailRepositorySpy = new UpdateRecipeByEmailRepositorySpy()
  return updateRecipeByEmailRepositorySpy
}

describe('Update Recipe UseCase', () => {
  test('Should return 500 if no recipeParam is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.UpdateRecipe()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
  })

  test('Should return 500 if recipeParam has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.UpdateRecipe({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
  })

  test('Should call RecipeValidator with correct params', async () => {
    const { sut, recipeValidatorSpy } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      prepareMethod: 'prepareMethod2',
      recipeYield: 'recipeYield2',
      product: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    await sut.UpdateRecipe(httpRequest)
    expect(recipeValidatorSpy.recipe.name).toBe(httpRequest.name)
  })

  test('Should call updateRecipeRepository with correct params', async () => {
    const { updateRecipeRepositorySpy, sut } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      prepareMethod: 'prepareMethod2',
      recipeYield: 'recipeYield2',
      product: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    await sut.UpdateRecipe(httpRequest)
    expect(updateRecipeRepositorySpy.recipe.name).toBe(httpRequest.name)
  })

  test('Should throw if any dependency throws', async () => {
    const updateRecipeRepositorySpy = makeUpdateRecipeRepositorySpy()
    const recipeValidatorSpy = makeRecipeValidator()
    const suts = [].concat(
      new UpdateRecipeUseCase({
        updateRecipeRepositorySpy: makeUpdateRecipeRepositorySpyWithError(),
        recipeValidatorSpy
      }),
      new UpdateRecipeUseCase({
        updateRecipeRepositorySpy,
        recipeValidatorSpy: makeRecipeValidatorWithError()
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        description: 'teste2e',
        prepareMethod: 'prepareMethod2',
        recipeYield: 'recipeYield2',
        product: '22222222222222',
        recipeId: '1',
        userId: '1'
      }
      const httpResponse = await sut.UpdateRecipe(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
    }
  })

  test('Should return 400 if an invalid recipe is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      description: '2',
      prepareMethod: '2',
      recipeYield: '2',
      product: '2',
      recipeId: '1',
      userId: '1'
    }
    const httpResponse = await sut.UpdateRecipe(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toBe(new InvalidParamError('teste2e').message)
  })

  test('Should return 200 if recipe was updated with sucess', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      prepareMethod: 'prepareMethod2',
      recipeYield: 'recipeYield2',
      product: '22222222222222',
      recipeId: '1',
      userId: '1'
    }

    const httpResponse = await sut.UpdateRecipe(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message).toBe('Successfully')
    expect(httpResponse.data).toEqual(httpRequest)
  })
})
