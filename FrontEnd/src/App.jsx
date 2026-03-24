import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import { addFavMovie, deleteFavMovie, getFavMovies, getUser } from "../API/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/rudecers/user.reducer";
import Loading from "./pages/Loading";
import MoviePage from "./pages/MoviePage";
import LSpinner from "./components/spinner";
import toast from "react-hot-toast";

export default function App() {
  const [user, setUser] = useState(null);
  const [favMovies, setFavMovies] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [favIdsIsLoading, setFavIdsIsLoading] = useState(false);
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();


  const toastOption = {duration: 2000, style:{boxShadow: "none"}}


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
      const favRes = await getFavMovies();
      setFavMovies(favRes.data.data);
      if (favRes.data.success) {
        const f = await favRes.data.data.map((m) => {
          return m.movieId;
        });
        setFavIds(f);
      }
      setFavIdsIsLoading(false);
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
                deleteMovieFromFav={deleteMovieFromFav}
                addMovieToFav={addMovieToFav}
                favIds={favIds}
                />
            )
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile
                favMovies={favMovies}
                setFavMovies={setFavMovies}
                user={user}
                favIds={favIds}
                setFavIds={setFavIds}
                deleteMovieFromFav={deleteMovieFromFav}
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
