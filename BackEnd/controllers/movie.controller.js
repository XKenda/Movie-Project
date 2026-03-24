import { createNewMovie, deleteFavMovie, getTop5Movies, incCount, incViews, insertFavouriteMovie, insertWatchedMovie, selectFavouriteMovies, selectWatchedMovies } from "../service/movie.service.js";


export const saveSearchTerm = async (req, res, next) => {
    try {
        const { movieName, posterUrl, movieId } = req.body;

        const movie = await incCount(movieId)

        if (movie) {
            return res.status(200).json({ success: true })
        }

        await createNewMovie({ movieName, posterUrl, movieId })


        res.status(201).json({ success: true })

    } catch (e) {
        next(e)
    }
}

export const updateViews = async (req, res, next) => {
    try {
        const { movieId, views } = req.body;

        const movie = await incViews(movieId, views)

        res.status(200).json({ success: true, data: movie })
    } catch (e) {
        next(e)
    }

}

export const trendingMovies = async (req, res, next) => {
    try {
        const top5Movies = await getTop5Movies();

        res.status(200).json({ success: true, data: top5Movies })
    } catch (e) {
        next(e)
    }
}

export const addWatchedMovie = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { movieId, movieTitle, posterUrl } = req.body

        const data = await insertWatchedMovie(userId, movieId, movieTitle, posterUrl)

        res.status(201).json({ success: true, data })
    } catch (e) {
        next(e)
    }
}

export const getWatchedMovie = async (req, res, next) => {
    try {
        const id = req.user.id

        const data = await selectWatchedMovies(id);

        res.status(200).json({ success: true, data })
    } catch (e) {
        next(e)
    }
}

export const addFavouriteMovie = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { movieId, movieTitle, posterUrl } = req.body

        await insertFavouriteMovie(userId, movieId, movieTitle, posterUrl)

        res.status(201).json({ success: true })
    } catch (e) {
        if(e.cause.code === '23505')
            return res.status(200).json({success: false, message: 'movie is already favourite'})
        next(e)
    }
}

export const getFavouriteMovies = async (req, res, next) => {
    try {
        const id = req.user.id

        const data = await selectFavouriteMovies(id);

        res.status(200).json({success: true, data})
    } catch (e) {
        next(e)
    }
}

export const deleteFavouriteMovies = async (req, res, next) => {
    try {
        const userId = req.user.id
        const movieId = req.params.id

        const {success} = await deleteFavMovie({userId, movieId})
        res.status(200).json({success})
    } catch (e) {
        next(e)
    }
}

// export const getFavMovie = async (req, res, next) => {
//     try {
//         const id = req.user.id;
//         const movieId = req.body.movieId;

//         const data = 

//     } catch (e) {
//         next(e)
//     }
// }