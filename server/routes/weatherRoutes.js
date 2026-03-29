import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

router.get('/', async (req, res) => {
  try {
    const { lat = 51.5074, lon = -0.1278 } = req.query  // defaults to London

    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weathercode,windspeed_10m,precipitation` +
      `&timezone=auto`

    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})


export default router