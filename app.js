const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const app = express()

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

app.disabled('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Hello server API Movies!" })
})


// CORS
app.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'https://movies.com',
    ]
  
    if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
    }
  
    if (!origin) {
        return callback(null, true)
    }
  
      return callback(new Error('Not allowed by CORS'))
    }
}))

// Get All Movies
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      return res.json(filteredMovies)
    }
    res.json(movies)
})

// Get an Movie by Id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if(movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})

// Create an Movie
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    // in Database
    const newMovie = {
      id: crypto.randomUUID(), // uuid v4
      ...result.data
    }

    movies.push(newMovie)
  
    res.status(201).json(newMovie)
})

// Delete an Movie
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    movies.splice(movieIndex, 1)
  
    return res.json({ message: 'Movie deleted' })
})

// Update an Movie

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    const updateMovie = {
      ...movies[movieIndex],
      ...result.data
    }
  
    movies[movieIndex] = updateMovie
  
    return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})