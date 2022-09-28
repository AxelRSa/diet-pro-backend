import { catchWrap } from '../../helpers/catchWrap'
import express from 'express'
const router = express.Router()

import checkAuth from '../../middleware/auth'
import * as controller from './persons.controllers'
import * as validation from './persons.validation'

/* Create */
router.post('/:idPerson/person-weights', checkAuth, validation.createPersonWeight, catchWrap(controller.createPersonWeight))

/* Read */

/* Update */
// router.put('/:idPerson/person-weights', checkAuth, validation.updatePersonWeight, catchWrap(controller.updatePersonWeight))

/* Delete */

export default router
