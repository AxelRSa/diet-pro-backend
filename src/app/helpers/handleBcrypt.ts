import * as bcrypt from 'bcryptjs'

/**
 * This function takes a string and returns a promise that resolves to a string.
 * @param {string} plainText - The text you want to encrypt.
 * @returns {Promise<string>} A Promise that resolves to a string.
 */
export const encrypt = async (plainText: string): Promise<string> => {
  const hash = await bcrypt.hash(plainText, 10)
  return hash
}

/**
 * This function takes a plain text password and a hashed password and returns a promise that resolves
 * to a boolean value.
 * @param {string} passwordPlain - The password that the user entered
 * @param {string} hashPassword - The hashed password that you want to compare against.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean.
 */
export const compare = async (passwordPlain: string, hashPassword: string) : Promise<boolean>=> {
  return await bcrypt.compare(passwordPlain, hashPassword)
}
