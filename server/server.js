import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import indexRouter from './routes/index.js'
import authRouter from './routes/authRoutes.js'

// import config from .env file
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/api/auth', authRouter)


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("server started on http://localhost:" + process.env.PORT)
});