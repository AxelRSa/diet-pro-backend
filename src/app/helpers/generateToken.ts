import { IDecodedTokenUser } from './../../types'
import * as jwt from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'

/* It's a way to tell TypeScript that the value of the environment variable JWT_SECRET is Secret. */
const JWT_SECRET = process.env.JWT_SECRET as Secret

/**
 * This function takes an user object with idUser and username, and returns a JWT token with
 * the idUser and username properties as the payload
 * @param user - user object from database
 * @returns A token signed with id and username and email
 */
export const tokenSign = async (user: { idUser: number, usernameUser: string, emailUser:string }) => {
  return jwt.sign(
    { id: user.idUser, username: user.usernameUser, email: user.emailUser},
    JWT_SECRET,
    { expiresIn: '7 days' }
  )
}

/**
 * It takes a token as a parameter, and returns the decoded token if it's valid, or null if it's not.
 * @param token - The token to verify
 * @returns The decoded token with the IDecodedTokenUser interface
 */
export const verifyToken = async (token: string): Promise<IDecodedTokenUser | null> => {
  try {
    return jwt.verify(token, JWT_SECRET) as IDecodedTokenUser
  } catch (error) {
    return null
  }
}