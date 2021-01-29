const CreateRecipeUseCase = require('../create-recipe-usecase')
const { InvalidParamError } = require('../../../utils/errors')
const HttpResponse = require('../../../utils/http-response')

const makeSut = () => {
  const recipeValidatorSpy = makeRecipeValidator()
  const readRecipeRepositorySpy = makeReadRecipeByEmailRepository()
  const createRecipeRepositorySpy = makeCreateRecipeRepositorySpy()
  const sut = new CreateRecipeUseCase(
    createRecipeRepositorySpy,
    readRecipeRepositorySpy,
    recipeValidatorSpy
  )
  return {
    sut,
    readRecipeRepositorySpy,
    createRecipeRepositorySpy,
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
    createRecipeValidatorSpy () {
      throw new Error()
    }
  }
  return new RecipeValidatorSpy()
}

const makeReadRecipeByEmailRepository = () => {
  class ReadRecipeByEmailRepositorySpy {
    async ReadRecipeByUserId (Recipe) {
      this.recipe = Recipe
      if (this.recipe.useremail === 'AlreadyExist@email.com') {
        return HttpResponse.conflictError('Recipe Already Exist')
      }
      return this.recipe
    }
  }
  const readRecipeByEmailRepositorySpy = new ReadRecipeByEmailRepositorySpy()
  return readRecipeByEmailRepositorySpy
}

const makeReadRecipeByEmailRepositoryRecipeAlreadyExist = () => {
  class ReadRecipeByEmailRepositorySpy {
    async ReadRecipeByUserId (Recipe) {
      this.recipe = Recipe
      return null
    }
  }
  const readRecipeByEmailRepositorySpy = new ReadRecipeByEmailRepositorySpy()
  return readRecipeByEmailRepositorySpy
}

const makeReadRecipeByEmailRepositoryWithError = () => {
  class ReadRecipeByEmailRepositorySpy {
    async ReadRecipeByUserId () {
      throw new Error()
    }
  }
  const readRecipeByEmailRepositorySpy = new ReadRecipeByEmailRepositorySpy()
  return readRecipeByEmailRepositorySpy
}

const makeCreateRecipeRepositorySpy = () => {
  class CreateRecipeByEmailRepositorySpy {
    async CreateRecipe (Recipe) {
      this.recipe = Recipe
      this.recipe.recipeId = '1'
      return this.recipe
    }
  }
  const createRecipeByEmailRepositorySpy = new CreateRecipeByEmailRepositorySpy()
  return createRecipeByEmailRepositorySpy
}

const makeCreateRecipeRepositorySpyWithError = () => {
  class CreateRecipeByEmailRepositorySpy {
    async CreateRecipe () {
      throw new Error()
    }
  }
  const createRecipeByEmailRepositorySpy = new CreateRecipeByEmailRepositorySpy()
  return createRecipeByEmailRepositorySpy
}

describe('Create Recipe UseCase', () => {
  test('Should return 500 if no recipeParam is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.CreateRecipe()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
  })

  test('Should return 500 if recipeParam has no body', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.CreateRecipe({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
  })

  test('Should call RecipeValidator with correct params', async () => {
    const { sut, recipeValidatorSpy } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    await sut.CreateRecipe(httpRequest)
    expect(recipeValidatorSpy.recipe.name).toBe(httpRequest.name)
  })

  test('Should call readRecipeByEmailRepository with correct params', async () => {
    const { sut, readRecipeRepositorySpy } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    await sut.CreateRecipe(httpRequest)
    expect(readRecipeRepositorySpy.recipe.name).toBe(httpRequest.name)
  })

  test('Should call createRecipeRepository with correct params', async () => {
    const { createRecipeRepositorySpy, recipeValidatorSpy } = makeSut()
    const ReadRecipeByEmailRepositoryRecipeAlreadyExist = makeReadRecipeByEmailRepositoryRecipeAlreadyExist()
    const sut =
      new CreateRecipeUseCase(
        createRecipeRepositorySpy,
        ReadRecipeByEmailRepositoryRecipeAlreadyExist,
        recipeValidatorSpy
      )
    const httpRequest = {
      description: 'teste2e',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    await sut.CreateRecipe(httpRequest)
    expect(createRecipeRepositorySpy.recipe.name).toBe(httpRequest.name)
  })

  test('Should throw if any dependency throws', async () => {
    const createRecipeRepositorySpy = makeCreateRecipeRepositorySpy()
    const readRecipeByEmailRepository = makeReadRecipeByEmailRepository()
    const recipeValidatorSpy = makeRecipeValidator()
    const suts = [].concat(
      new CreateRecipeUseCase({
        createRecipeRepositorySpy: makeCreateRecipeRepositorySpyWithError(),
        readRecipeByEmailRepository,
        recipeValidatorSpy
      }),
      new CreateRecipeUseCase({
        createRecipeRepositorySpy,
        readRecipeByEmailRepository: makeReadRecipeByEmailRepositoryWithError(),
        recipeValidatorSpy
      }),
      new CreateRecipeUseCase({
        createRecipeRepositorySpy,
        readRecipeByEmailRepository,
        recipeValidatorSpy: makeRecipeValidatorWithError()
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        description: 'teste2e',
        preparationMethod: 'preparationMethod2',
        recipeYield: 'recipeYield2',
        ingredient: '22222222222222',
        recipeId: '1',
        userId: '1'
      }
      const httpResponse = await sut.CreateRecipe(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
    }
  })

  test('Should return 400 if an invalid recipe is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      description: '2',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    const httpResponse = await sut.CreateRecipe(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.message).toBe(new InvalidParamError('teste2e').message)
  })

  test('Should return 409 if recipe already exist', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      description: 'teste2e',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }
    const httpResponse = await sut.CreateRecipe(httpRequest)
    expect(httpResponse.statusCode).toBe(409)
    expect(httpResponse.message).toBe('Recipe Already Exist')
  })

  test('Should return 200 if recipe was created with sucess', async () => {
    const { createRecipeRepositorySpy, recipeValidatorSpy } = makeSut()
    const ReadRecipeByEmailRepositoryRecipeAlreadyExist = makeReadRecipeByEmailRepositoryRecipeAlreadyExist()
    const sut =
      new CreateRecipeUseCase(
        createRecipeRepositorySpy,
        ReadRecipeByEmailRepositoryRecipeAlreadyExist,
        recipeValidatorSpy
      )
    const httpRequest = {
      description: 'teste2e',
      preparationMethod: 'preparationMethod2',
      recipeYield: 'recipeYield2',
      ingredient: '22222222222222',
      recipeId: '1',
      userId: '1'
    }

    const httpResponse = await sut.CreateRecipe(httpRequest)
    console.log(httpResponse.data)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message).toBe('Successfully')
    expect(httpResponse.data).toEqual(httpRequest)
  })
})
