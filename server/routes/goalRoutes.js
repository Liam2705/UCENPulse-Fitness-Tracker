import express from 'express'
import { getGoals, updateGoals } from '../controllers/goalController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

router.get('/', getGoals)
router.put('/', updateGoals)

export default router