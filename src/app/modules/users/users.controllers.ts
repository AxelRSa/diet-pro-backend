import { Request, Response } from 'express'
import { CustomError } from './../../helpers/generateErrors'
import * as personsService from '../../services/persons.service'
import * as foodsService from '../../services/foods.service'
// import * as mealsService from '../../services/meals.service'

/* Create */
/**
 * It creates a person
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 * @returns returns a response object
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

export const createFood = async (req: Request, res: Response) => {
  const { idUser } = req.params as {idUser:string}
  const { name, protein, carbohydrates, fat } = req.body as {name:string, protein:string, carbohydrates:string, fat:string}

  const foodsWithThatName = await foodsService.getFoodsByIdUserAndName(idUser, name)
  if (foodsWithThatName.length >= 1) throw new CustomError(400, 'That name exists, please, choose another one')
  await foodsService.createFood(idUser, name, protein, carbohydrates, fat)

  res.json({message: `The food ${name} was created` })
}