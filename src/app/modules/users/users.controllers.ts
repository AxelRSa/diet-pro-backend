import { Request, Response } from 'express'
import { CustomError } from './../../helpers/generateErrors'
import * as personsService from '../../services/persons.service'
import * as foodsService from '../../services/foods.service'
import * as mealsService from '../../services/meals.service'

/* Create */

/**
 * It creates a person
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 */
export const createPerson = async (req: Request, res: Response) => {
  const { idUser } = req.params as {idUser:string}
  const { name } = req.body as {name:string}

  /* Checking if the person name exists and if not, create one. */
  const personWithThatName = await personsService.getPersonByIdUserAndName(idUser, name)
  if (personWithThatName.length >= 1) throw new CustomError(400, 'That name exists, please, choose another one') 
  await personsService.createPerson(idUser, name)

  res.json({ message: `The person ${name} was created` })
}

/**
 * It creates a food in the database, but only if there's no food with the same name in the database.
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 */
export const createFood = async (req: Request, res: Response) => {
  const { idUser } = req.params as {idUser:string}
  const { name, protein, carbohydrates, fat } = req.body as {name:string, protein:string, carbohydrates:string, fat:string}

  /* Checking if there's a food with that name in the database, if there's one, it throws an error, if
  not, it creates the food. */
  const foodsWithThatName = await foodsService.getFoodsByIdUserAndName(idUser, name)
  if (foodsWithThatName.length >= 1) throw new CustomError(400, 'That name exists, please, choose another one')
  await foodsService.createFood(idUser, name, protein, carbohydrates, fat)

  res.json({message: `The food ${name} was created` })
}

/**
 * It creates a meal and the foods for that meal for a user, 
 * but if the user already has a meal with that name, it throws an error.
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 */
export const createMeal = async (req: Request, res: Response) => {
  const { idUser } = req.params as {idUser:string}
  const { name, measure, foods } = req.body as { name:string, measure:string, foods:{idFood:string, idMeasure:string, quantity:string}[] }

  /* It's checking if there's a meal with that name in the database, if there's one, it throws an error,
  if not, it creates the meal. */
  const mealsWithThatName = await mealsService.getMealsByIdUserAndName(idUser, name)
  if (mealsWithThatName.length >= 1) throw new CustomError(400, 'That name exists, please, choose another one')

  /* It's getting the id of the meal that was created and converting it to a string to add the foods
  for that meal. */
  const { insertId } = await mealsService.createMeal(idUser, name, measure)
  const idMeal = insertId.toString()

  /* It's creating the foods for the meal. */
  await Promise.all(
    foods.map(({ idFood, idMeasure, quantity }) => {
      return mealsService.createFoodPerMeal(idMeal, idFood, idMeasure, quantity)
    })
  )

  res.json({ message: `The meal '${name}' was created` })
}

/* Read */
/* Update */
/* Delete */
