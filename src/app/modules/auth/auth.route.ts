import { catchWrap } from './../../helpers/catchWrap'
import express from 'express'
const router = express.Router()

import checkAuth from '../../middleware/auth'
import * as controller from './auth.controllers'
import * as validation from './auth.validation'

router.post('/login', validation.login, catchWrap(controller.login))
router.post('/signup', validation.signup, catchWrap(controller.signup))

router.get('/user', checkAuth, catchWrap(controller.getUser))

export default router
