import { Request, Response, NextFunction } from 'express'
import { CustomError } from './../../helpers/generateErrors'
import * as personsService from '../../services/persons.service'
// import * as foodsService from '../../services/foods.service'
// import * as mealsService from '../../services/meals.service'

/* Create */
/**
 * It creates a person
 * @param req - Request - The request object.
 * @param res - Response - The response object.
 * @returns returns a response object
 */
export const createPerson = async (req: Request, res: Response, next:NextFunction) => {
  const { idUser } = req.params as {idUser:string}
  const { name } = req.body as {name:string}

  /* Checking if the person exists and if not, create one. */
  const personWithThatName = await personsService.getPersonByIdUserAndName(idUser, name)
  if (personWithThatName.length >= 1) { return next(new CustomError(400, 'That name exists, please, choose another one')) }
  await personsService.createPerson(idUser, name)

  return res.json({ status: 'success', message: `The person ${name} was created` })
}
