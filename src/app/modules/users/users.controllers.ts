import { Request, Response } from 'express'
import * as personsService from '../../services/persons.service'
// import * as foodsService from '../../services/foods.service'
// import * as mealsService from '../../services/meals.service'

/* Create */
/**
 * It creates a person
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object.
 * @returns returns a response object
 */
export const createPerson = async (req: Request, res: Response) => {
  try {
    const { idUser:idUserString } = req.params as {idUser:string}
    const { name } = req.body as {name:string}

    /* Converting the string to a number. */
    const idUser = +idUserString

    /* Checking if the person exists and if not, create one. */
    const personWithThatName = await personsService.getPersonByIdUserAndName(idUser, name)
    if (personWithThatName.length >= 1) throw new Error('That name exists, please, choose another one')
    await personsService.createPerson(idUser, name)

    return res.json({ status: 'success', message: `The person ${name} was created` })

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
