const ReadAllRecipeUseCase = require('../readAll-recipe-usecase')
const HttpResponse = require('../../../utils/http-response')

const makeSut = () => {
  const readAllRecipeRepository = makeReadAllRecipeRepository()
  const sut = new ReadAllRecipeUseCase(
    readAllRecipeRepository
  )
  return {
    sut,
    readAllRecipeRepository
  }
}

const makeReadAllRecipeRepository = () => {
  class ReadAllRecipeRepository {
    async ReadAllRecipeByUserId (userId) {
      const recipes = [
        {
          name: 'recipe1'
        },
        {
          name: 'recipe2'
        }
      ]
      return recipes
    }
  }
  const readAllRecipeRepository = new ReadAllRecipeRepository()
  return readAllRecipeRepository
}

const makeReadRecipeRepositoryWithError = () => {
  class ReadAllRecipeRepository {
    async ReadAllRecipe () {
      throw new Error()
    }
  }
  const readAllRecipeRepository = new ReadAllRecipeRepository()
  return readAllRecipeRepository
}

describe('Read Recipe UseCase', () => {
  test('Should throw if any dependency throws', async () => {
    const suts = [].concat(
      new ReadAllRecipeUseCase({
        deleteRecipeRepositorySpy: makeReadRecipeRepositoryWithError()
      })
    )
    for (const sut of suts) {
      const httpResponse = await sut.ReadAllRecipe()
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
    }
  })

  test('Should return 200 if recipe was deleted with sucess', async () => {
    const { sut } = makeSut()
    const recipes = [
      {
        name: 'recipe1'
      },
      {
        name: 'recipe2'
      }
    ]

    const httpResponse = await sut.ReadAllRecipe()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message).toBe('Successfully')
    expect(httpResponse.data).toEqual(recipes)
  })
})
