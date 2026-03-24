import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ProfileMovieCard = ({movie, deleteMovieFromFav}) => {

    const {movieId, movieTitle, posterUrl} = movie

    const handleFav = async () => {
        try {
            await deleteMovieFromFav({movieId: movie.movieId, title: movie.movieTitle})
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
        </div>
    );
};

export default ProfileMovieCard;