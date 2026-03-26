import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import { addFavMovie, addWatchedMovie, deleteFavMovie, getFavMovies, getUser, getWatchedMovie, saveSearch } from "../API/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/rudecers/user.reducer";
import Loading from "./pages/Loading";
import MoviePage from "./pages/MoviePage";
import LSpinner from "./components/spinner";
import toast from "react-hot-toast";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

export default function App() {
  const [user, setUser] = useState(null);
  
  const [moviesList, setMoviesList] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [favIdsIsLoading, setFavIdsIsLoading] = useState(false);
  const [watchedIds, setWatchedIds] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [watchedIsLoading, setWatchedIsLoading] = useState(false)
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const toastOption = {duration: 2000, style:{boxShadow: "none"}}


  const fetchMovies = async (query = "") => {
      try {
      const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMoviesList(data.results || []);
      if(query)
          await saveSearch({movie:data.results[0]})
      } catch (error) {
      console.error(error);
      return error.message
      }
  };


  const addIdToFav = (id) => {
    favIds.push(id.toString())
    setFavIds(favIds)
  }

  const deleteIdFromFav = (movieId) => {
    setFavIds(favIds.filter(id => id !== movieId.toString()))
  }
  
  const addMovieToFav = async ({movie: {id, title, poster_path}}) => {
    const MovieData = {movieId: id, movieTitle: title, posterUrl: poster_path}
    if(favIds.includes(MovieData.movieId.toString()))
      return toast("already in fav")
    favMovies.push(MovieData)
    setFavMovies(favMovies)
    addIdToFav(id)
    toast(`${title} added to favourite`, toastOption)
    await addFavMovie(MovieData)
  }
  
  const deleteMovieFromFav = async ({movieId, title}) => {
    if(!favIds.includes(movieId.toString()))
      return toast("Cann't delte this movie")
    setFavMovies(favMovies.filter(movie => movie.movieId !== movieId))
    toast(`${title} deleted from favourite`, toastOption)
    deleteIdFromFav(movieId)
    await deleteFavMovie({movieId})
  }
  
  const addIdToWatched = (id) => {
    watchedIds.push(id.toString())
    setWatchedIds(watchedIds)
  }
  
  const addWatchMovie = async ({movie: {id, title, poster_path}}) => {
    const watchedAt = new Date().toISOString()
    const MovieData = {movieId: id, movieTitle: title, posterUrl: poster_path, watchedAt}
    watchedMovies.push(MovieData)
    setWatchedMovies(watchedMovies)
    addIdToWatched(id)
    await addWatchedMovie(MovieData)
  }


  useEffect(() => {
    async function getData() {
      try {
        if (userState.username) {
          setUser(userState);
        } else {
          const res = await getUser();

          if (res.data) {
            setUser(res.data);
            dispatch(setUserState(res.data));
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      setFavIdsIsLoading(true);
      setWatchedIsLoading(true)
      const favRes = await getFavMovies();
      const watchedRes = await getWatchedMovie();
      setFavMovies(favRes.data.data);
      if (favRes.data.success) {
        const f = await favRes.data.data.map((m) => {
          return m.movieId;
        });
        setFavIds(f);
      }
      setWatchedMovies(watchedRes.data.data)
      if(watchedRes.data.success) {
        const watched = watchedRes.data.data.map((movie)=> {
            return movie.movieId
        })
        setWatchedIds(watched)
      }
      setFavIdsIsLoading(false);
      setWatchedIsLoading(false)
    }

    getData();
  }, []);
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            favIdsIsLoading ? (
              <div className=" text-5xl flex justify-center items-end">
                <LSpinner />
              </div>
            ) : (
              <Home
              watchedIds={watchedIds}
              fetchMovies={fetchMovies}
              moviesList={moviesList}
                deleteMovieFromFav={deleteMovieFromFav}
                addMovieToFav={addMovieToFav}
                favIds={favIds}
                />
            )
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/movie/:id" element={watchedIsLoading? <Loading />: <MoviePage addWatchMovie={addWatchMovie} moviesList={moviesList} watchedIds={watchedIds} />} />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile
                user={user}
                favMovies={favMovies}
                deleteMovieFromFav={deleteMovieFromFav}
                watchedMovies={watchedMovies}
              />
            ) : (
              <Loading />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
