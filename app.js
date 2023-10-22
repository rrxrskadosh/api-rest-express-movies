const express = require('express')
const movies = require("./movies.json")

const app = express()

app.disabled('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Hello server!" })
})

// Get All Movies

app.get('./movies', (req, res) => {
    return res.json(movies)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})