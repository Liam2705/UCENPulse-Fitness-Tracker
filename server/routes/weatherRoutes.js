import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(protect) // these routes require auth

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get current weather data
 *     description: Returns current weather conditions from Open-Meteo for a given location. Defaults to London if no coordinates are provided.
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: false
 *         description: Latitude (defaults to 51.5074)
 *         example: 51.5074
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: false
 *         description: Longitude (defaults to -0.1278)
 *         example: -0.1278
 *     responses:
 *       200:
 *         description: Current weather data
 *       401:
 *         description: Not authorised
 *       503:
 *         description: Weather service unavailable
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const { lat = 51.5074, lon = -0.1278 } = req.query  // defaults to London

    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weathercode,windspeed_10m,precipitation` +
      `&timezone=auto`

    const response = await fetch(url)

    if (!response.ok) {
      return res.status(503).json({ error: 'Weather service unavailable' })
    }

    const data = await response.json()
    res.json(data)
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})


export default router