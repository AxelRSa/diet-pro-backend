const { paginationStart, paginationEnd, howManyPagesAre } = require("../../helpers/paginationHelper")
const { generateDashboardPersonStructure, generateFoodStructure } = require("../../helpers/handleArraysAndObjects")


const personService = require('../../services/user.service');
const foodService = require("../../services/food.service")

const createPerson = async (req, res) => {
  try {
    const { idUser, name } = req.body

    const personWithThatName = await personService.getPersonByIdUserAndName(idUser, name)
    if (personWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await personService.createPerson(idUser, name)

    res.json({ status: "success", message: `The person ${name} was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const createFood = async (req, res) => {
  try {
    const { idUser, name, protein, carbohydrates, fat } = req.body

    const foodsWithThatName = await foodService.getFoodsByIdUserAndName(idUser, name)
    if (foodsWithThatName.length >= 1) throw "That name exists, please, choose another one"

    await foodService.createFood(idUser, name, protein, carbohydrates, fat)

    res.json({ status: "success", message: `The food with name: ${name}, was created` })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const getPersonsWeights = async (req, res) => {
  try {
    const { firstDate, secondDate, idUser } = req.query

    const personsData = await personService.getPersonsWeightsByUserId(idUser, firstDate, secondDate)

    const arrayModified = generateDashboardPersonStructure(personsData)

    res.json({ status: "success", data: { persons: arrayModified } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error.message })
  }
}

const getFoods = async (req, res) => {
  try {
    const { search, idUser, pagination } = req.query

    const ITEMS_PER_PAGINATION = 10
    const limitStart = paginationStart(pagination, ITEMS_PER_PAGINATION)
    const limitEnd = paginationEnd(pagination, ITEMS_PER_PAGINATION)
    let dbResponse = null
    let paginationResponse = null
    let howManyPaginationAre = null


    if (!search) {
      paginationResponse = await foodService.getFoodsCountByIdUser(idUser)
      howManyPaginationAre = howManyPagesAre(paginationResponse[0].count, ITEMS_PER_PAGINATION)
      dbResponse = await foodService.getFoodsByIdUserWithLimits(idUser, limitStart, limitEnd)
    } else {
      paginationResponse = await foodService.getFoodsCountByIdUserAndSearch(idUser)
      howManyPaginationAre = howManyPagesAre(paginationResponse[0].count, ITEMS_PER_PAGINATION)
      dbResponse = await foodService.getFoodsByIdUserAndSearchWithLimits(idUser, limitStart, limitEnd, search)
    }


    const data = {
      foods: generateFoodStructure(dbResponse),
      pagination: {
        current: parseInt(pagination),
        exist: howManyPaginationAre
      }
    }

    res.json({ status: "success", data })
  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  createPerson,
  createFood,
  getPersonsWeights,
  getFoods
}
