import express from 'express'
import { createMetric, deleteMetric, getMetric, updateMetric } from '../controllers/metricController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

router.post('/', createMetric)
router.get('/', getMetric)
router.put('/:id', updateMetric)
router.delete('/:id', deleteMetric)

export default router