import { IoIosEye } from "react-icons/io";
import { NavLink } from "react-router-dom";

const ProfileWatchedMovieCard = ({movie}) => {

    const {movieId, movieTitle, posterUrl, watchedAt} = movie

    return (
        <div className="profile-movie-card-con movie-card mx-5">
            <div className="profile-movie-card flex flex-col justify-center text-center">
                <NavLink className='btn' to={`/movie/${movieId}`}><img className="w-50" src={posterUrl? `https://image.tmdb.org/t/p/w500${posterUrl}` : '/no-movie.png'} alt={movieTitle} /></NavLink>
                <h3 className="profile-movie-title my-5 text-2xl max-w-50 text-center">{movieTitle}</h3>
                <p className="watched-at">Time: {watchedAt.split("T")[0]}</p>
            </div>
        </div>
    );
};

export default ProfileWatchedMovieCard;