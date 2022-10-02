import { catchWrap } from '../../helpers/catchWrap'
import express from 'express'
const router = express.Router()

import checkAuth from '../../middleware/auth'
import * as controller from './foods.controllers'
import * as validation from './foods.validation'

/* Create */
router.post('/:idFood/measures', checkAuth, validation.createFoodMeasure, catchWrap(controller.createFoodMeasure))

/* Read */

/* Update */
router.put('/:idFood/measures/:idMeasure', checkAuth, validation.updateFoodMeasure, catchWrap(controller.updateFoodMeasure))

/* Delete */
router.delete('/:idFood', checkAuth, validation.deleteFood, catchWrap(controller.deleteFood))
router.delete('/measures/:idMeasure', checkAuth, validation.deleteFoodMeasure, catchWrap(controller.deleteFoodMeasure))

export default router
