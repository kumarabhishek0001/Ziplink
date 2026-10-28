import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import urlRouter from './routes/url.routes.js'
import { visitShortURLController } from './controller/url.contoller.js'

const corsConfig = {
    origin: process.env.FRONTEND_URL,
    Credential: true
}

// configure app
const app = express()

// configure middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors(corsConfig))

// API routes
app.get("/check", (req, res) => {
    res.send("APP is live")
})

// 
app.use("/api/urls",urlRouter)

// URL redirects route
app.get("/:shortID", visitShortURLController)

export default app