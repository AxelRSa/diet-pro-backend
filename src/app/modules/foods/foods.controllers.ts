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
  const foodMeasureWithThatName = await foodsService.getFoodMeasuresByIdFoodAndName(idFood, name)
  if (foodMeasureWithThatName.length >= 1) throw new CustomError(400, 'That measure exists, please, choose another one') 
  await foodsService.createFoodMeasure(idFood, name, quantity)

  res.json({ message: `The measure ${name} was created` })
}

/* Read */
/* Update */
/* Delete */
