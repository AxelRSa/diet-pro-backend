import { Request, Response } from 'express'
import { encrypt, compare } from '../../helpers/handleBcrypt'
import * as usersService from '../../services/users.service'

/**
 * signup controller check if the email already exists and encrypt the password
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object that will be sent back to the client.
 * @returns The response is being returned.
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as { email: string, password: string, username: string }

    /* Checking if the email exist in the database. */
    const emailsResponse = await usersService.getEmailByEmail(email) 
    if (emailsResponse.length > 0) throw new Error('The email exist, try with another')

    /* Encrypting the password and then creating the user. */
    const hashedPassword = await encrypt(password)
    await usersService.createUser(email, hashedPassword, username)

    const response = { 
      status: 'success', 
      message: 'The user was created successfully'
    }

    return res.json(response)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 'error', message: error.message })
    }
  }
}
