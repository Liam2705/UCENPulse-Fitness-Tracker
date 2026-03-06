import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// import config from .env file
dotenv.config();

const app = express();

app.use(cors({origin: 'http://localhost:5173'}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("server started on http://localhost:" + process.env.PORT)
});