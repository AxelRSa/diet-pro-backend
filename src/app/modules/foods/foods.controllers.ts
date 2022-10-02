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
  const { name, grams } = req.body as { name:string, grams:string }

  /* Checki if the name of received measure exists and if not, create one. */
  const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndMeasureName(idFood, name)
  if (foodMeasureWithThatName.length >= 1) throw new CustomError(400, 'That measure exists, please, choose another one') 
  await foodsService.createFoodMeasure(idFood, name, grams)

  res.json({ message: `The measure ${name} was created` })
}

/* Read */
/* Update */

/**
 * Update the food measure. It checks if the measure name exists and if the id is different, 
 * and then update the measure.
 * @param {Request} req - Request express
 * @param {Response} res - Response express
 */
export const updateFoodMeasure = async (req: Request, res: Response) => {
  const { idFood, idMeasure } = req.params as {idFood:string, idMeasure:string}
  const { name, grams } = req.body as {name:string, grams:string}

  /* Checking if the measure name exists and if the id is different, 
  it throws an error and then update the measure .*/
  const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndMeasureName(idFood, name)
  const isNameInDBAndItsIdIsDifferent = foodMeasureWithThatName.length >= 1 && foodMeasureWithThatName[0].idMeasure !== Number(idMeasure)
  if (isNameInDBAndItsIdIsDifferent) throw new CustomError(400,'That measure exists, please, choose another one')
  await foodsService.updateFoodMeasureByIdMeasure(idMeasure, name, grams)

  res.json({ message: `The measure ${name} was updated` })
}

/* Delete */

/**
 * It deletes a food from the database.
 * @param req - Request - The request object.
 * @param res - Response - The response object that will be sent back to the client.
 */
export const deleteFood = async (req: Request, res: Response) => {
  const { idFood } = req.params as { idFood:string }

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
