import { Request, Response } from 'express'
import * as personsService from '../../services/persons.service'

/**
 * Create an register in person weights
 * @param req - Request - Request object
 * @param res - Response Response object
 */
export const createPersonWeight = async (req: Request, res: Response) => {
  const { idPerson } = req.params as {idPerson:string}
  const { weight, date } = req.body as { weight:string, date:string}

  await personsService.createPersonWeightByIdPerson(idPerson, weight, date)

  res.json({ message: 'Your information was received' })
}