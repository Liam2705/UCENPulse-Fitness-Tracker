import express from 'express'
import { getGoals, updateGoals } from '../controllers/goalController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get the current user's fitness goals
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's goals
 *       401:
 *         description: Not authorised
 */
router.get('/', getGoals)

/**
 * @swagger
 * /api/goals:
 *   put:
 *     summary: Update the current user's fitness goals
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stepsGoal:
 *                 type: integer
 *                 example: 5000
 *               waterGoal:
 *                 type: number
 *                 example: 2.0
 *               caloriesGoal:
 *                 type: integer
 *                 example: 250
 *               sleepGoal:
 *                 type: number
 *                 example: 8.5
 *     responses:
 *       200:
 *         description: Goals updated successfully
 *       401:
 *         description: Not authorised
 */
router.put('/', updateGoals)

export default router