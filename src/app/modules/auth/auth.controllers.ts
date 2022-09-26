import { CustomError } from './../../helpers/generateErrors'
import { tokenSign, verifyToken } from './../../helpers/generateToken'
import { Request, Response, NextFunction } from 'express'
import { encrypt, compare } from '../../helpers/handleBcrypt'
import * as usersService from '../../services/users.service'

/**
 * signup controller check if the email already exists and encrypt the password
 * @param req - Request - The request object
 * @param res - Response - The response object that will be sent back to the client.
 * @returns The response is being returned.
 */
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body as { email: string, password: string, username: string }

  /* Checking if the email exist in the database. */
  const emailsResponse = await usersService.getEmailByEmail(email)
  if (emailsResponse.length > 0)  return next(new CustomError(400, 'The email exist, try with another'))

  /* Encrypting the password and then creating the user. */
  const hashedPassword = await encrypt(password)
  await usersService.createUser(email, hashedPassword, username)

  const response = { message: 'The user was created successfully'}

  return res.json(response)
}

/**
 * It receives the email and password from the user, checks if the email is registered in the database,
 * compares the password that the user sent with the password that is stored in the database, signs and
 * gets the token, and finally returns the token to the user.
 * @param req - Request - The request object
 * @param res - Response - The response object that will be sent to the client
 * @returns The token
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as { email: string, password: string }

  /* Checking if the email exist in the database and save the data in a constant */
  const userData = await usersService.getUserByEmail(email)
  if (userData.length === 0) return next(new CustomError(400, 'The email is not registered, create an account'))
  const user = userData[0]

  /* Comparing the password that the user sent with the password that is stored in the database, 
  sign and get the token to send to the user */
  const passwordMatch = await compare(password, user.passwordUser)
  if (!passwordMatch) return next(new CustomError(400, 'The password is incorrect, verify it'))
  const token = await tokenSign(user)

  const response = {
    message: `Welcome ${user.usernameUser}`,
    data: { token }
  }

  return res.json(response)
}

/**
 * It gets the user's data from the database and returns it to the user to use in frontend
 * @param req - Request - The request object that is sent by the client.
 * @param res - Response - The response object that is returned by the express server.
 * @returns The user info email, id and username
 */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()

  /* Checking if the token is undefined, if it is, it throws an error. */
  if (token === undefined) { return next(new CustomError(400, 'The auth token was not send')) }

  /* Verifying the token that the user sent, if the token is valid, it returns the data of the token that
    was signed, if the token is not valid, it returns and Error. */
  const decodedToken = await verifyToken(token)
  if (decodedToken === null) { return next(new CustomError(401, 'There is an problem with authentication, try again')) }
  const { id } = decodedToken

  /* Destructuring the object that is returned by the function getUserById, and it is saving the values */
  const [{ usernameUser: username, emailUser: email }] = await usersService.getUserById(id)

  const response = {
    data: { user: { email, id, username } }
  }

  return res.json(response)
}
