import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { deleteFavMovie } from "../../API/authApi";
import toast, { Toaster } from "react-hot-toast";

const ProfileMovieCard = ({movie, favIds, setFavIds, favMovies, setFavMovies}) => {

    const {movieId, movieTitle, posterUrl} = movie

    const handleFav = async () => {
        try {
            setFavMovies(favMovies.filter(movie => movie.movieId !== movieId));
            setFavIds(favIds.filter((id)=> {return id !== movieId}))
            const res = await deleteFavMovie({movieId})

            if(res.data.success)
                toast("movie delted from from favourite")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="profile-movie-card-con movie-card mx-5">
            <div className="profile-movie-card flex flex-col justify-center text-center">
                <NavLink className='btn' to={`/movie/${movieId}`}><img className="w-50" src={posterUrl? `https://image.tmdb.org/t/p/w500${posterUrl}` : '/no-movie.png'} alt={movieTitle} /></NavLink>
                <h3 className="profile-movie-title my-5 text-2xl max-w-50 text-center">{movieTitle}</h3>
                <p className="btn fav-icon-con text-red-600 text-3xl flex justify-center" onClick={handleFav}><MdFavorite className="" /></p>
            </div>
            <Toaster />
        </div>
    );
};

export default ProfileMovieCard;