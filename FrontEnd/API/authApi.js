import api from "./axios";

export const signUp = (firstName, lastName, email, password, age) => {
    return api.post("/auth/sign-up", { firstName, lastName, email, password, age });
};


export const logIn = (email, password) => {
    return api.post('/auth/log-in', {email, password})
}

export const getUser = () => {
    return api.get('/user/me')
}

export const saveSearch = ({movie: {title, id, poster_path}}) => {
    return api.post('/movie/save-search', {movieName:title, posterUrl:poster_path, movieId:id})
}

export const getTrendingMovies = ()=>{
    return api.get('/movie/trend')
}

export const addWatchedMovie = ({movieId, movieTitle, posterUrl}) => {
    return api.post('/movie/watched', {movieId, movieTitle, posterUrl})
}

export const getWatchedMovie = () => {
    return api.get('/movie/watched')
}

export const addFavMovie = ({movieId, movieTitle, posterUrl}) => {

    return api.post('/movie/favourite', {movieId, movieTitle, posterUrl})
}

export const getFavMovies = () => {
    return api.get('/movie/favourite')
}

export const deleteFavMovie = ({movieId}) => {
    console.log(movieId)
    return api.delete(`/movie/favourite/${movieId}`)
}