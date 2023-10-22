const express = require('express')
const movies = require("./movies.json")

const app = express()

app.disabled('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Hello server API Movies!" })
})

// Get All Movies

app.get('/movies/', (req, res) => {
    return res.json(movies)
})

// Get an Movie by Id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if(movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})


const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})