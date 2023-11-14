// Router Node
import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

// Get All Movies
moviesRouter.get('/', MovieController.getAll)

// Get an Movie by Id
moviesRouter.get('/:id', MovieController.getById)

// Create an Movie
moviesRouter.post('/', MovieController.create)

// Delete an Movie
moviesRouter.delete('/:id', MovieController.delete)

// Update an Movie
moviesRouter.patch('/:id', MovieController.update)