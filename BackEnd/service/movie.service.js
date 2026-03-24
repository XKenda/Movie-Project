import { eq, sql } from "drizzle-orm"
import { PDB } from "../DB/postgresqul.js"
import TMovie from "../models/trendingMovie.model.js"
import { latestWatched } from "../schema/watchedHistory.schema.js"
import { favouriteMovies } from "../schema/favouriteMovie.schema.js"

export const incCount = async (movieId, incNum = 1) => {
    try {
        const movie = await TMovie.findOneAndUpdate({ movieId }, { $inc: { count: incNum } }, { new: true })
        if (!movie) return false

        await movie.save()
        return movie
    } catch (e) {
        throw new Error(e.message)
    }
}

export const createNewMovie = async ({ movieName, posterUrl, movieId }) => {
    try {
        const movie = new TMovie({ movieName, posterUrl, movieId })
        await movie.save()
        return movie
    } catch (e) {
        throw new Error(e.message)
    }
}

export const incViews = async (movieId, incCount = 1) => {
    try {
        const movie = await TMovie.findOneAndUpdate({ movieId }, { $inc: { views: incCount } }, { new: true })

        if (!movie) throw new Error("Cann't find movie");

        await movie.save();

        return movie
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getTop5Movies = async () => {
    try {
        // get top 5 movies that have the most score
        const top5Movies = await TMovie.find().sort({score: -1}).limit(5)

        return top5Movies
    } catch (e) {
        throw new Error(e.message)
    }
}

export const insertWatchedMovie = async (userId, movieId, movieTitle, posterUrl) => {
    try {
        const data = (await PDB.insert(latestWatched).values({userId, movieId, movieTitle, posterUrl}).returning())[0];  

        return data;
    } catch (e) {
        throw new Error(e.message)
    }
}

export const selectWatchedMovies = async (userId) => {
    try {
        const data = await PDB.select({
            movieId: latestWatched.movieId,
            movieTitle: latestWatched.movieTitle,
            posterUrl: latestWatched.posterUrl
        })
        .from(latestWatched)
        .where(eq(latestWatched.userId, userId));

        return data
    } catch (e) {
        throw new Error(e.message)
    } 
}

export const insertFavouriteMovie = async (userId, movieId, movieTitle, posterUrl) => {
    try {

        const data = (await PDB.insert(favouriteMovies).values({userId, movieId, movieTitle, posterUrl}).returning())[0];  

        return data;
    } catch (e) {
        throw e
    }
}

export const selectFavouriteMovies = async (userId) => {
    try {
        const data = await PDB.select({
            movieId: favouriteMovies.movieId,
            movieTitle: favouriteMovies.movieTitle,
            posterUrl: favouriteMovies.posterUrl
        })
        .from(favouriteMovies)
        .where(eq(favouriteMovies.userId, userId));

        return data 
    } catch (e) {
        throw new Error(e.message)
    }  
}

export const deleteFavMovie = async ({userId, movieId}) => {
    try {
        console.log(typeof movieId)
        const data = (await PDB.delete(favouriteMovies).where(sql`${favouriteMovies.userId} = ${userId} and ${favouriteMovies.movieId} = ${movieId}`).returning())[0]

        return {success: true, data}

    } catch (e) {
        return e
    }
}

// export const selectFavMovie = async (userId, movieId) => {
//     try {
//         data = await PDB.select().from(favouriteMovies).where(sql`${favouriteMovies.userId} = ${userId} and ${favouriteMovies.movieId} = ${movieId}`)
//     }
// }