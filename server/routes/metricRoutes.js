import express from 'express'
import { createMetric, deleteMetric, getMetric, updateMetric } from '../controllers/metricController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validate } from '../middlewares/validate.js'
import { body } from 'express-validator'

const router = express.Router()

router.use(protect) // these routes require auth

// Server validation
const metricsValidation = [
    body('steps')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Steps must be a positive number'),

    body('waterIntake')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Water intake must be positive'),

    body('sleepHours')
        .optional()
        .isFloat({ min: 0, max: 24 })
        .withMessage('Sleep hours must be 0-24'),

    body('caloriesBurned')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Calories must be positive'),
]

router.post('/', metricsValidation, validate, createMetric)
router.get('/', getMetric)
router.put('/:id', metricsValidation, validate, updateMetric)
router.delete('/:id', deleteMetric)

export default router