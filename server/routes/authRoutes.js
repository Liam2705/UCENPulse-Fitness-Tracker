import express from 'express'
import { login, register, logout, getMe } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validate } from '../middlewares/validate.js'
import { body } from 'express-validator'

const router = express.Router()

const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Valid email required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),

    body('lastName')
        .notEmpty()
        .withMessage('Last name is required'),

]

router.post('/register', registerValidation, validate, register)
router.post('/login', login)
router.post('/logout', logout)

router.get('/me', protect, getMe)

export default router