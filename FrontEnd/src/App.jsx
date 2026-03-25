import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import { getFavMovies, getUser, getWatchedMovie } from "../API/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/rudecers/user.reducer";
import Loading from "./pages/Loading";
import MoviePage from "./pages/MoviePage";
import LSpinner from "./components/spinner";

export default function App() {
  const [user, setUser] = useState(null);
  
  const [favMovies, setFavMovies] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [favIdsIsLoading, setFavIdsIsLoading] = useState(false);
  const [watchedIds, setWatchedIds] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
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
      const watchedRes = await getWatchedMovie();
      setFavMovies(favRes.data.data);
      if (favRes.data.success) {
        const f = await favRes.data.data.map((m) => {
          return m.movieId;
        });
        setFavIds(f);
      }
      if(watchedRes.data.success) {
        const watched = watchedRes.data.data.map((movie)=> {
            return movie.movieId
        })
        setWatchedMovies(watched)
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
                favIds={favIds} 
                setFavIds={setFavIds} 
                favMovies={favMovies}
                setFavMovies={setFavMovies}
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
