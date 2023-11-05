import { randomUUID } from 'node:crypto'

// Validating Data Type in execution time with Zod
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

// Import require utils readJSON from creating require
import { readJSON } from '../utils.js'

// Router Node
import { Router } from 'express'

// Using readJSON
const movies = readJSON('./movies.json')
export const moviesRouter = Router()

// Get All Movies
moviesRouter.get('/', (req, res) => {
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
moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if(movie) return res.json(movie)
    res.status(404).json({message: 'Movie not found'})
})

// Create an Movie
moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
  
    // in Database
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...result.data
    }

    movies.push(newMovie)
  
    res.status(201).json(newMovie)
})

// Delete an Movie
moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }
  
    movies.splice(movieIndex, 1)
  
    return res.json({ message: 'Movie deleted' })
})

// Update an Movie
moviesRouter.patch('/:id', (req, res) => {
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