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

/**
 * @swagger
 * /api/metrics:
 *   post:
 *     summary: Log daily metrics
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               steps:
 *                 type: integer
 *                 example: 8000
 *               waterIntake:
 *                 type: number
 *                 example: 2.5
 *               sleepHours:
 *                 type: number
 *                 example: 7.5
 *               caloriesBurned:
 *                 type: integer
 *                 example: 450
 *     responses:
 *       201:
 *         description: Metrics logged successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorised
 */
router.post('/', metricsValidation, validate, createMetric)

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get all metrics for the logged-in user
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of metrics entries
 *       401:
 *         description: Not authorised
 */
router.get('/', getMetric)

/**
 * @swagger
 * /api/metrics/{id}:
 *   put:
 *     summary: Update a metrics entry
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Metrics entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               steps:
 *                 type: integer
 *               waterIntake:
 *                 type: number
 *               sleepHours:
 *                 type: number
 *               caloriesBurned:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Metrics updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorised
 *       404:
 *         description: Metrics entry not found
 */
router.put('/:id', metricsValidation, validate, updateMetric)

/**
 * @swagger
 * /api/metrics/{id}:
 *   delete:
 *     summary: Delete a metrics entry
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Metrics entry ID
 *     responses:
 *       200:
 *         description: Metrics entry deleted successfully
 *       401:
 *         description: Not authorised
 *       404:
 *         description: Metrics entry not found
 */
router.delete('/:id', deleteMetric)

export default router