/* The `CustomError` class extends the `Error` class and adds a `status` property */
export class CustomError extends Error {
  status: number

  /**
  * Define the shape of the custom error
  * @param {number} status - The HTTP status code to return.
  * @param {string} message - The message that will be displayed to the user.
  */
  constructor(status:number, message:string) {
    super(message)
    this.status = status
  }
}