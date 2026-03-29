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


/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, duration]
 *             properties:
 *               type:
 *                 type: string
 *                 example: Running
 *               duration:
 *                 type: integer
 *                 example: 30
 *               notes:
 *                 type: string
 *                 example: Morning jog
 *     responses:
 *       201:
 *         description: Activity created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorised
 */
router.post('/', activityValidation, validate, createActivity)

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities for the logged-in user
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activities
 *       401:
 *         description: Not authorised
 */
router.get('/', getActivity)

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: Running
 *               duration:
 *                 type: integer
 *                 example: 30
 *               notes:
 *                 type: string
 *                 example: Morning jog
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorised
 *       404:
 *         description: Activity not found
 */
router.put('/:id', activityValidation, validate, updateActivity)

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete an activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       401:
 *         description: Not authorised
 *       404:
 *         description: Activity not found
 */
router.delete('/:id', deleteActivity)

export default router