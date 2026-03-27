import express from 'express'
import { createActivity, deleteActivity, getActivity, updateActivity } from '../controllers/activityController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

router.post('/', createActivity)
router.get('/', getActivity)
router.put('/:id', updateActivity)
router.delete('/:id', deleteActivity)

export default router