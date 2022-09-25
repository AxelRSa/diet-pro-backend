import { Request, Response } from 'express'
import { encrypt, compare } from '../../helpers/handleBcrypt'
import * as usersService from '../../services/users.service'

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as { email: string, password: string, username: string }

    const emailsResponse = await usersService.getEmailByEmail(email) 
    const emailsArray = emailsResponse[0] as {email: string}[]
    if (emailsArray.length > 0) throw new Error('The email exist, try with another')

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
