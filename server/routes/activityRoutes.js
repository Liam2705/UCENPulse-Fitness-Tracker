import express from 'express'
import { createActivity, deleteActivity, getActivity, updateActivity } from '../controllers/activityController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validate } from '../middlewares/validate.js'
import { body } from 'express-validator'

const router = express.Router()

router.use(protect) // these routes require auth

// Server validation
const activityValidation = [
    body('type')
        .notEmpty().withMessage('Activity type is required')
        .trim()
        .escape(),

    body('notes')
        .optional()
        .trim()
        .escape(),

    body('duration')
        .isInt({ min: 1, max: 1440 }).withMessage('Duration must be 1-1440 minutes'),
]

router.post('/', activityValidation, validate, createActivity)
router.get('/', getActivity)
router.put('/:id', activityValidation, validate, updateActivity)
router.delete('/:id', deleteActivity)

export default router