import React from "react";
import { NavLink } from "react-router-dom";

const TrendingMovieCard = ({ movie: { movieName, movieId, posterUrl } }) => {
    return (
        <div className="trend-movie-card-con">
        <NavLink className="btn" to={`/movie/${movieId}`}>
            <img
            className=""
            src={
                posterUrl
                ? `https://image.tmdb.org/t/p/w500${posterUrl}`
                : "/no-movie.png"
            }
            alt={movieName}
            />
        </NavLink>
        </div>
    );
};

export default TrendingMovieCard;
