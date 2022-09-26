import { checkAuth } from './../../middleware/auth'
import express from 'express'
const router = express.Router()

// const { checkAuth } = require("../../middleware/auth")
import * as controller from './auth.controllers'
import * as validation from './auth.validation'

router.post('/login', validation.login, controller.login)
router.post('/signup', validation.signup, controller.signup)

router.get('/user', checkAuth, controller.getUser)

export default router
