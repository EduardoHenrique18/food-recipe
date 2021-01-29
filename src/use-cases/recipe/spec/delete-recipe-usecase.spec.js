const DeleteRecipeUseCase = require('../delete-recipe-usecase')
const HttpResponse = require('../../../utils/http-response')

const makeSut = () => {
  const deleteRecipeRepositorySpy = makeDeleteRecipeRepository()
  const sut = new DeleteRecipeUseCase(
    deleteRecipeRepositorySpy
  )
  return {
    sut,
    deleteRecipeRepositorySpy
  }
}

const makeDeleteRecipeRepository = () => {
  class DeleteRecipeRepositorySpy {
    async DeleteRecipe (param) {
      this.recipeId = param
      return this.recipeId
    }
  }
  const deleteRecipeRepositorySpy = new DeleteRecipeRepositorySpy()
  return deleteRecipeRepositorySpy
}

const makeDeleteRecipeRepositoryWithError = () => {
  class DeleteRecipeRepositorySpy {
    async DeleteRecipe () {
      throw new Error()
    }
  }
  const deleteRecipeRepositorySpy = new DeleteRecipeRepositorySpy()
  return deleteRecipeRepositorySpy
}

describe('Create Recipe UseCase', () => {
  test('Should call deleteRecipeRepository with correct params', async () => {
    const { sut, deleteRecipeRepositorySpy } = makeSut()
    const httpRequest = {
      recipeId: '1'
    }
    await sut.DeleteRecipe(httpRequest)
    console.log(deleteRecipeRepositorySpy)
    expect(deleteRecipeRepositorySpy.recipeId).toBe(httpRequest.recipeId)
  })

  test('Should throw if any dependency throws', async () => {
    const suts = [].concat(
      new DeleteRecipeUseCase({
        deleteRecipeRepositorySpy: makeDeleteRecipeRepositoryWithError()
      })
    )
    for (const sut of suts) {
      const httpRequest = {
        recipeId: '1'
      }
      const httpResponse = await sut.DeleteRecipe(httpRequest)
      expect(httpResponse.statusCode).toBe(500)
      expect(httpResponse.message).toBe(HttpResponse.ServerError().message)
    }
  })

  test('Should return 200 if recipe was deleted with sucess', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      recipeId: '1'
    }

    const httpResponse = await sut.DeleteRecipe(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.message).toBe('Successfully')
    expect(httpResponse.data).toEqual(httpRequest.recipeId)
  })
})
