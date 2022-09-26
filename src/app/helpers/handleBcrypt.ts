import * as bcrypt from 'bcryptjs'

/**
 * This function takes a string and returns a promise that resolves to a string.
 * @param plainText - The text you want to encrypt.
 * @returns Give the password hashed
 */
export const encrypt = async (plainText: string) => {
  return await bcrypt.hash(plainText, 10)
}

/**
 * This function takes a plain text password and a hashed password and returns a promise that resolves
 * to a boolean value.
 * @param passwordPlain - The password that the user entered
 * @param hashPassword - The hashed password that you want to compare against.
 * @returns Give a boolean to know if the strings are equal
 */
export const compare = async (passwordPlain: string, hashPassword: string) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}
