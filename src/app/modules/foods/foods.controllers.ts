import { CustomError } from './../../helpers/generateErrors'
import { Request, Response } from 'express'
import * as foodsService from '../../services/foods.service'

/* Create */

/**
 * It creates a person
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 */
export const createFoodMeasure = async (req: Request, res: Response) => {
  const { idFood } = req.params as { idFood:string }
  const { name, quantity } = req.body as { name:string, quantity:string }

  /* Checking if the name of received measure exists and if not, create one. */
  const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndMeasureName(idFood, name)
  if (foodMeasureWithThatName.length >= 1) throw new CustomError(400, 'That measure exists, please, choose another one') 
  await foodsService.createFoodMeasure(idFood, name, quantity)

  res.json({ message: `The measure ${name} was created` })
}

/* Read */
/* Update */
/* Delete */

/**
 * It deletes a food from the database.
 * @param req - Request - The request object.
 * @param res - Response - The response object that will be sent back to the client.
 */
export const deleteFood = async (req: Request, res: Response) => {
  const { idFood } = req.params as { idFood:string }

  // ! urgent change 
  // todo add methods to check if the register depends on others tables

  await foodsService.deleteFoodByIdFood(idFood)

  res.json({ message: 'The food was deleted' })
}


/**
 * It deletes a food measure by its idMeasure.
 * @param req - Request from express
 * @param res - Response from express
 */
export const deleteFoodMeasure = async (req: Request, res: Response) => {
  const { idMeasure } = req.params as { idMeasure:string }

  await foodsService.deleteFoodMeasureByIdMeasure(idMeasure)

  res.json({ message: 'The measure was deleted' })
}
