import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.disabled('x-powered-by')
app.use(json())

// CORS
app.use(corsMiddleware())

app.get('/', (req, res) => {
    res.json({ message: "Hello server API Movies!" })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})