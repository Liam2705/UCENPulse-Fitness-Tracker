import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import indexRouter from './routes/index.js'
import authRouter from './routes/authRoutes.js'
import activityRouter from './routes/activityRoutes.js'
import metricRouter from './routes/metricRoutes.js'
import goalRouter from './routes/goalRoutes.js'
import weatherRouter from './routes/weatherRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'

// import config from .env file
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/activities', activityRouter)
app.use('/api/metrics', metricRouter)
app.use('/api/goals', goalRouter)
app.use('/api/weather', weatherRouter)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//Global error handler
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)
    res.status(err.status || 500).json({ error: err.message })
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("server started on http://localhost:" + process.env.PORT)
});

