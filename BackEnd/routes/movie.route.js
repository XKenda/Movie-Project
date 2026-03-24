import express from "express"
import { addFavouriteMovie, addWatchedMovie, deleteFavouriteMovies, getFavouriteMovies, getWatchedMovie, saveSearchTerm, trendingMovies, updateViews } from "../controllers/movie.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const movieRouter = express.Router()


movieRouter.post("/save-search", saveSearchTerm)
movieRouter.post("/views", updateViews)
movieRouter.get("/trend", trendingMovies)
movieRouter.post('/watched', auth, addWatchedMovie)
movieRouter.get('/watched', auth, getWatchedMovie)
movieRouter.post('/favourite', auth, addFavouriteMovie)
movieRouter.get('/favourite', auth, getFavouriteMovies)
movieRouter.delete('/favourite/:id', auth, deleteFavouriteMovies)




export default movieRouter;