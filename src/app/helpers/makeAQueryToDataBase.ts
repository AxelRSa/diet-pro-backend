import { FieldPacket } from 'mysql2'
import { CustomError } from './generateErrors'

/**
 * It's a function that returns a promise that resolves to the
 * result of the query function passed as an argument.
 * @param functionQuery - This is the function that will be executed.
 * @returns A data from the executed function
 */
export const makeAQueryToDataBase = async <T>(functionQuery: () => Promise<[T, FieldPacket[]]>) => {
  try {
    return await functionQuery()
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Cannot delete or update a parent row')) {
        throw new CustomError(500, 'You use this register in other tables, erase it first')
      }
    }
    throw new CustomError(500, 'Database error, contact support')
  }
}
