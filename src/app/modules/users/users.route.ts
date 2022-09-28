import { catchWrap } from '../../helpers/catchWrap'
import express from 'express'
const router = express.Router()

import checkAuth from './../../middleware/auth'
import * as controller from './users.controllers'
import * as validation from './users.validation'

/* Create */
router.post('/:idUser/persons', checkAuth, validation.createPerson, catchWrap(controller.createPerson))
router.post('/:idUser/foods', checkAuth, validation.createFood, catchWrap(controller.createFood))
// router.post("/:idUser/meals", checkAuth, validation.createMeal, controller.createMeal)

/* Read */
// router.get("/:idUser/person-weights", checkAuth, validation.getPersonsWeights, controller.getPersonsWeights)
// router.get("/:idUser/foods", checkAuth, validation.getFoods, controller.getFoods)
// router.get("/:idUser/persons/:idPerson/person-weights", checkAuth, validation.getPersonWeights, controller.getPersonWeights)
// router.get("/:idUser/foods/:idFood", checkAuth, validation.getFood, controller.getFood)
// router.get("/:idUser/meals", checkAuth, validation.getMeals, controller.getMeals)
// router.get("/:idUser/meals/:idMeal", checkAuth, validation.getMeal, controller.getMeal)

/* Update */
// router.put("/:idUser/persons/:idPerson", checkAuth, validation.updatePersonName, controller.updatePersonName)
// router.put("/:idUser/foods/:idFood", checkAuth, validation.updateFood, controller.updateFood)
// router.put("/:idUser/meals/:idMeal", checkAuth, validation.updateMeal, controller.updateMeal)

/* Delete */

export default router
