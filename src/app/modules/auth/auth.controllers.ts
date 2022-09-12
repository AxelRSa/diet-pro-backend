import { Request, Response } from "express";

export const signup = async (req: Request, res: Response):Promise < void | Error> => {
	try {
		const {email, password} = req.body

		const response: object = {
			status: "success", 
			message: "Your login was successful",
			data: {}
		} 
		
		res.json(response)
	} catch (error) {
		console.log(error);
	}
}