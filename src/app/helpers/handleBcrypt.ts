import * as bcrypt from 'bcryptjs'

/**
 * @module handleBcrypt
 */

/**
 * This function takes a string and returns a promise that resolves to a string.
 * @param {string} plainText - The text you want to encrypt.
 * @returns {Promise<string>} Give the password hashed
 */
export const encrypt = async (plainText: string): Promise<string> => {
  return await bcrypt.hash(plainText, 10)
}

/**
 * This function takes a plain text password and a hashed password and returns a promise that resolves
 * to a boolean value.
 * @param {string} passwordPlain - The password that the user entered
 * @param {string} hashPassword - The hashed password that you want to compare against.
 * @returns {Promise<boolean>} Give a boolean to know if the strings are equal
 */
export const compare = async (passwordPlain: string, hashPassword: string) : Promise<boolean>=> {
  return await bcrypt.compare(passwordPlain, hashPassword)
}
